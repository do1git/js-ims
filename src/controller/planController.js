import { jsDateToKdate } from "../middlewares";
import Plan from "../models/Plan";
import Pump from "../models/Pump";

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
    obj.id = plans[i]._id;
    plans_k.push(obj);
  }

  return res.render("home", { plans_k });
};

export const getManage = async (req, res) => {
  try {
    const { keyword, user, current } = req.query;
    let search = false;
    if (keyword || user || current) {
      search = true;
      const parameters = {
        name: {
          $regex: new RegExp(keyword, "i"),
        },
      };
      if (user) {
        parameters.user = user;
      }
      if (current) {
        parameters.current = current;
      }
      console.log(parameters);
      const pumps = await Pump.find(parameters);
      return res.render("manage", { pumps, search });
    } else {
      search = false;
      const pumps = await Pump.find({}).sort({ lastEdit: "desc" }).limit(10);
      return res.render("manage", { pumps, search });
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
  res.render("planViews/planRegister", { pump });
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
    const plan = await Plan.create({
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
      filePaths: [],
      thumbnail: null,
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
  res.render("planViews/planView", { plan });
};

export const getDoneRegister = async (req, res) => {
  const { id } = req.params;
  const plan = await Plan.findById(id).populate("model");
  res.render("planViews/doneRegister", { plan });
};

export const postDoneRegister = async (req, res) => {
  const { id } = req.params;
  const filePaths = [];
  req.files.forEach((e) => {
    const eachPath = e.path;
    filePaths.push(eachPath);
  });
  await Plan.findByIdAndUpdate(id, { filePath: filePaths }, { new: true });
  const plan = await Plan.findById(id).populate("model");
  res.render("planViews/pickThumb", { plan });
};

export const postDoneRegister2 = async (req, res) => {
  const { id } = req.params;
  const mainPic = req.body.mainPic;
  const plan = await Plan.findById(id).populate("model");
  const model_id = plan.model._id;
  await Pump.findByIdAndUpdate(model_id, { mainPic });
  await Plan.findByIdAndUpdate(id, { status: "done" });

  res.redirect("/done");
};

export const getDoneList = async (req, res) => {
  const donePlans = await Plan.find({ status: "done" }).populate("model");
  return res.render("done", { donePlans });
};

export const getPlanEdit = async (req, res) => {
  const plan_id = req.params.id;
  const plan = await Plan.findById(plan_id);
  //const{status,approved_id,ordered_date,planned_outbound_date,}
};

// export const getPlanDone = (req, res) => {};
// export const getManage = (req, res) => {};
// export const getPlanRegister = (req, res) => {};
// export const getPlanEdit = (req, res) => {};
// export const getPlanDelete = (req, res) => {};
