import { jsDateToKdate, jsYYYYMMDD } from "../middlewares";
import Plan from "../models/Plan";
import Pump from "../models/Pump";
import User from "../models/User";
import bcrypt from "bcrypt";

export const home = async (req, res) => {
  let plans = await Plan.find({ status: "wait" }).populate("model");
  let plans_k = [];
  for (let i = 0; i < plans.length; i++) {
    let obj = {};
    obj.planned_manufacturing_date = jsDateToKdate(
      plans[i].planned_manufacturing_date
    );
    obj.planned_outbound_date = jsDateToKdate(plans[i].planned_outbound_date);
    obj.model = Object(plans[i].model);
    obj.quantity = plans[i].quantity;
    obj.id = plans[i]._id;
    plans_k.push(obj);
  }

  return res.render("home", { plans_k, header: "생산 예정 모델" });
};

export const getManage = async (req, res) => {
  try {
    const { keyword, user, motor, department } = req.query;
    let search = false;

    if (keyword || user || motor || department) {
      search = true;
      const parameters = {};
      // const parameters = {
      //   name: {
      //     $regex: new RegExp(keyword, "i"),
      //   },
      // };

      if (keyword) {
        parameters.name = { $regex: RegExp(keyword, "i") };
      }
      if (user) {
        parameters.user = { $regex: RegExp(user, "i") };
      }
      if (motor) {
        const motorUp = motor.toUpperCase();
        parameters.motor = { $regex: RegExp(motorUp, "i") };
      }
      if (department) {
        parameters.department = department;
      }
      const pumps = await Pump.find(parameters);
      return res.render("manage", {
        pumps,
        search,
        header: "다음에 대한 검색결과",
      });
    } else {
      search = false;
      const pumps = await Pump.find({}).sort({ lastEdit: "desc" }).limit(10);
      return res.render("manage", { pumps, search, header: "펌프 목록" });
    }
  } catch {
    return res.render("404");
  }
};

export const getPlanRegister = async (req, res) => {
  const { id } = req.params;
  const pump = await Pump.findById(id);
  if (!pump)
    return res.render("404", { errorMessage: "해당 모델이 존재하지 않습니다" });
  res.render("planViews/planRegister", {
    pump,
    header: `${pump.name}의 생산/출고계획 등록`,
  });
};

export const postPlanRegister = async (req, res) => {
  const pump_id = req.params.id;
  const {
    approved_id,
    ordered_date,
    planned_manufacturing_date,
    planned_outbound_date,
    quantity,
    packaging,
    memo,
  } = req.body;
  try {
    await Plan.create({
      model: pump_id,
      reference: [],
      status: "wait",
      approved_id,
      quantity,
      ordered_date,
      planned_manufacturing_date,
      manufacturing_date: null,
      planned_outbound_date,
      outbound_date: null,
      memo,
      file_Paths: [],
      file_thumbnail: null,
      member: [],
      packaging,
      uploader_plan: req.session.user.name,
    });
  } catch (error) {
    return res.status(400).render("404", {
      errorMessage: "계획을 수립할 수 없습니다 (빠진 기록사항을 확인하세요)",
    });
  }
  req.flash(
    "success",
    `승인번호 '${approved_id}'의 생산/출고계획이 등록되었습니다`
  );
  return res.redirect("/");
};

export const getPlanView = async (req, res) => {
  const { id } = req.params;
  const plan = await Plan.findById(id).populate("model");
  res.render("planViews/planView", {
    plan,
    header: `${plan.model.name} 에 대한 생산/출고계획`,
  });
};

export const getDoneRegister = async (req, res) => {
  const { id } = req.params;
  const plan = await Plan.findById(id).populate("model");
  const worker_db = await User.find({
    department: `생산부-${plan.model.department}`,
  });
  const workers = [];
  for (let i = 0; i < worker_db.length; i++) {
    let worker = {};
    (worker.id = worker_db[i]._id), (worker.name = worker_db[i].name);

    workers.push(worker);
  }
  console.log(workers);
  res.render("planViews/doneRegister", {
    plan,
    header: `${plan.model.name} 에 대한 사진등록`,
    workers,
  });
};

export const postDoneRegister = async (req, res) => {
  const { id } = req.params;
  const { member } = req.body;

  const filePaths = [];
  req.files.forEach((e) => {
    const eachPath = e.path;
    filePaths.push(eachPath);
  });
  await Plan.findByIdAndUpdate(
    id,
    { file_Paths: filePaths, member, uploader_photo: req.session.user.name },
    { new: true }
  );
  const plan = await Plan.findById(id).populate("model");
  res.render("planViews/pickThumb", {
    plan,
    header: `${plan.model.name}의 대표사진`,
  });
};

export const postDoneRegister2 = async (req, res) => {
  const plan_id = req.params.id;
  const mainPic = req.body.mainPic;

  await Plan.findByIdAndUpdate(plan_id, {
    status: "done",
    file_thumbnail: mainPic,
    manufacturing_date: Date.now(),
  });
  req.flash("success", `출고용 사진등록이 완료되었습니다`);
  res.redirect("/done");
};

export const getDoneList = async (req, res) => {
  const donePlans = await Plan.find({ status: "done" }).populate("model");

  let plans_k = [];
  for (let i = 0; i < donePlans.length; i++) {
    let obj = {};
    obj.planned_manufacturing_date = jsDateToKdate(
      donePlans[i].planned_manufacturing_date
    );
    obj.planned_outbound_date = jsDateToKdate(
      donePlans[i].planned_outbound_date
    );
    obj.model = Object(donePlans[i].model);
    obj.quantity = donePlans[i].quantity;
    obj.id = donePlans[i]._id;
    plans_k.push(obj);
  }

  return res.render("home", { plans_k, header: "생산완료 / 출고대기 모델" });
};

export const getPlanEdit = async (req, res) => {
  const { id } = req.params;
  const plan = await Plan.findById(id).populate("model");
  res.render("planViews/planEdit", {
    plan,
    header: `${plan.model.name}에 대한 계획수정`,
  });
};

export const postPlanEdit = async (req, res) => {
  const { id } = req.params;
  const {
    status,
    approved_id,
    quantity,
    ordered_date,
    planned_manufacturing_date,
    planned_outbound_date,
    memo,
    member,
    packaging,
  } = req.body;
  let { manufacturing_date, outbound_date } = req.body;
  if (status === "wait") {
    manufacturing_date = null;
    outbound_date = null;
  } else if (status === "done") {
    outbound_date = null;
  }

  try {
    await Plan.findByIdAndUpdate(id, {
      status,
      approved_id,
      quantity,
      ordered_date,
      planned_manufacturing_date,
      manufacturing_date,
      planned_outbound_date,
      outbound_date,
      memo,
      member,
      packaging,
      uploader_plan: req.session.user.name,
    });
  } catch (error) {
    return res
      .status(404)
      .render("404", { errorMessage: "수정할 펌프가 없습니다" });
  }
  req.flash(
    "success",
    `승인번호 '${approved_id}'의 생산/출고 계획이 수정되었습니다`
  );
  return res.redirect(`/plans/${id}`);
};

export const getPlanDelete = async (req, res) => {
  const { id } = req.params;
  const plan = await Plan.findById(id);
  res.render("check", {
    header: `입고/출고계획 '${plan.approved_id}' 삭제처리`,
    code: "delete",
  });
};

export const postPlanDelete = async (req, res) => {
  const { id } = req.params;
  const {
    session: {
      user: { password },
    },
    body: { check },
  } = req;
  const plan = await Plan.findById(id);
  const planApproved_id = plan.approved_id;
  const ok = await bcrypt.compare(check, password);
  if (!ok) {
    return res.status(400).render("check", {
      errorMessage: "비밀번호를 확인하세요",
      header: `입고/출고계획 '${plan.approved_id}' 삭제처리`,
      code: "delete",
    });
  } else {
    await Plan.findByIdAndRemove(id);
    req.flash(
      "success",
      `입고/출고계획 '${plan.approved_id}' 삭제처리가 완료되었습니다`
    );
    res.redirect("/");
  }
};

export const getOutboundList = async (req, res) => {
  let plans = await Plan.find({ status: "outbound" }).populate("model");
  let plans_k = [];
  for (let i = 0; i < plans.length; i++) {
    let obj = {};
    obj.planned_manufacturing_date = jsDateToKdate(
      plans[i].planned_manufacturing_date
    );
    obj.planned_outbound_date = jsDateToKdate(plans[i].planned_outbound_date);
    obj.model = Object(plans[i].model);
    obj.quantity = plans[i].quantity;
    obj.id = plans[i]._id;
    plans_k.push(obj);
  }

  return res.render("home", { plans_k, header: "출고 완료 모델" });
};

export const getOutbound = async (req, res) => {
  const { id } = req.params;
  const plan = await Plan.findById(id);
  res.render("check", {
    header: `입고/출고계획 '${plan.approved_id}' 출고처리`,
    code: "outbound",
  });
};
export const postOutbound = async (req, res) => {
  const { id } = req.params;
  const {
    session: {
      user: { password },
    },
    body: { check },
  } = req;
  const plan = await Plan.findById(id);
  const uploader = req.session.user.name;
  const ok = await bcrypt.compare(check, password);
  if (!ok) {
    return res.status(400).render("check", {
      errorMessage: "비밀번호를 확인하세요",
      header: `입고/출고계획 '${plan.approved_id}' 출고처리`,
      code: "delete",
    });
  } else {
    // await Plan.findByIdAndUpdate(id, {
    //   status: "outbound",
    //   outbound_date: Date.now(),
    // });
    plan.status = "outbound";
    plan.outbound_date = Date.now();
    plan.uploader_outbound = uploader;
    await plan.save();
    req.flash(
      "success",
      `입고/출고계획 '${plan.approved_id}' 출고처리가 완료되었습니다`
    );
    res.redirect("/outbound");
  }
};
