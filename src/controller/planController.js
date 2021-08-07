import Plan from "../models/Plan";
import Pump from "../models/Pump";

export const home = async (req, res) => {
  const plans = await Plan.find({ status: "wait" }).populate("model");
  return res.render("home", { plans });
};

export const manage = async (req, res) => {
  try {
    const pumps = await Pump.find({});
    return res.render("manage", { pumps });
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
    manufacturing_Def,
    memo,
  } = req.body;
  try {
    const plan = await Plan.create({
      approved_id,
      ordered_date,
      planned_manufacturing_date,
      planned_outbound_date,
      manufacturing_Def,
      memo,
      model: pump_id,
      filePath: [],
    });
  } catch (error) {
    return res.status(400).render("404", {
      errorMessage: "계획을 수립할 수 없습니다 (server Side)",
    });
  }
  return res.redirect("/");
};

export const getPlanView = async (req, res) => {
  const { id } = req.params;
  const plan = await Plan.findById(id).populate("model");
  console.log(plan);
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
  console.log(plan);
  const model_id = plan.model.pump_id;
  await Pump.findByIdAndUpdate(model_id, { mainPic });
  await Plan.findByIdAndUpdate(id, { status: "done" });

  res.redirect("/done");
};

export const getDoneList = async (req, res) => {
  const donePlans = await Plan.find({ status: "done" }).populate("model");
  return res.render("done", { donePlans });
};

// export const getPlanDone = (req, res) => {};
// export const getManage = (req, res) => {};
// export const getPlanRegister = (req, res) => {};
// export const getPlanEdit = (req, res) => {};
// export const getPlanDelete = (req, res) => {};
