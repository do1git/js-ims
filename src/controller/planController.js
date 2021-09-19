import { jsDateToKdate, jsYYYYMMDD } from "../middlewares";
import Plan from "../models/Plan";
import Pump from "../models/Pump";
import User from "../models/User";

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
    const { keyword, user, motor } = req.query;
    let search = false;

    if (keyword || user || motor) {
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
        parameters.user = user;
      }
      if (motor) {
        parameters.motor = motor;
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
    header: `${pump.name} 으로 출고계획 등록`,
  });
};

export const postPlanRegister = async (req, res) => {
  const pump_id = req.params.id;
  const {
    approved_id,
    ordered_date,
    planned_manufacturing_date,
    planned_outbound_date,
    manufacturing_department,
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
      manufacturing_department,
      memo,
      file_Paths: [],
      file_thumbnail: null,
      member: [],
      packaging,
    });
  } catch (error) {
    return res.status(400).render("404", {
      errorMessage: "계획을 수립할 수 없습니다 (빠진 기록사항을 확인하세요)",
    });
  }
  return res.redirect("/");
};

export const getPlanView = async (req, res) => {
  const { id } = req.params;
  const plan = await Plan.findById(id).populate("model");
  res.render("planViews/planView", {
    plan,
    header: `${plan.model.name} 에 대한 출고계획`,
  });
};

export const getDoneRegister = async (req, res) => {
  const { id } = req.params;
  const plan = await Plan.findById(id).populate("model");
  const worker_db = await User.find({
    department: `생산부-${plan.manufacturing_department}`,
  });
  const workers = [];
  for (let i = 0; i < worker_db.length; i++) {
    let worker = {};
    (worker.id = worker_db[i]._id), (worker.name = worker_db[i].name);

    workers.push(worker);
  }

  res.render("planViews/doneRegister", {
    plan,
    header: `${plan.model.name} 에 대한 사진등록`,
    workers,
  });
};

export const postDoneRegister = async (req, res) => {
  const { id } = req.params;
  const { member } = req.body;
  console.log(member);
  const filePaths = [];
  req.files.forEach((e) => {
    const eachPath = e.path;
    filePaths.push(eachPath);
  });
  await Plan.findByIdAndUpdate(
    id,
    { file_Paths: filePaths, member },
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

  return res.render("home", { plans_k, header: "생산 완료 모델" });
};

export const getPlanEdit = async (req, res) => {
  const { id } = req.params;
  const plan = await Plan.findById(id).populate("model");
  const planK = {
    status: plan.status,
    approved_id: plan.approved_id,
    quantity: plan.quantity,

    ordered_date: jsYYYYMMDD(plan.ordered_date),
    planned_manufacturing_date: jsYYYYMMDD(plan.planned_manufacturing_date),
    manufacturing_date: jsYYYYMMDD(plan.manufacturing_date),
    planned_outbound_date: jsYYYYMMDD(plan.planned_outbound_date),
    outbound_date: jsYYYYMMDD(plan.outbound_date),

    manufacturing_department: plan.manufacturing_department,
    memo: plan.memo,
    member: plan.member,
    packaging: plan.packaging,
  };
  res.render("planViews/planEdit", {
    planK,
    header: `${plan.model.name}에 대한 출고계획수정`,
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
    manufacturing_date,
    planned_outbound_date,
    outbound_date,
    manufacturing_department,
    memo,
    member,
    packaging,
  } = req.body;
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
      manufacturing_department,
      memo,
      member,
      packaging,
    });
  } catch (error) {
    return res
      .status(404)
      .render("404", { errorMessage: "수정할 펌프가 없습니다" });
  }
  return res.redirect(`/plans/${id}`);
};

// export const getPlanDone = (req, res) => {};
// export const getManage = (req, res) => {};
// export const getPlanRegister = (req, res) => {};
// export const getPlanEdit = (req, res) => {};
// export const getPlanDelete = (req, res) => {};
