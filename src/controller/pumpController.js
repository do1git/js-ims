import Pump from "../models/Pump";

export const getPumpRegister = (req, res) => {
  res.render("pumpViews/pumpRegister", { header: "새로운 모델 등록하기" });
};

export const postPumpRegister = async (req, res) => {
  const { free_flowRate, code, user, motor, coating, domestic, version } =
    req.body;
  try {
    await Pump.create({
      free_flowRate,
      code,
      name: free_flowRate + code,
      user,
      motor,
      coating,
      domestic,
      version,
      lastEdit: Date.now(),
    });
    return res.redirect("/manage");
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .render("pumpViews/pumpRegister", { errorMessage: "< 등록오류발생 >" });
  }
};
export const getPumpView = async (req, res) => {
  const { id } = req.params;
  const pump = await Pump.findById(id);
  if (!pump) {
    return res.status(404).render("404");
  }
  return res.render("pumpViews/pumpView", {
    pump,
    header: `${pump.name} 의 상세정보`,
  });
};

export const getPumpEdit = async (req, res) => {
  const { id } = req.params;
  const pump = await Pump.findById(id);
  if (!pump) {
    return res.status(404).render("404");
  }
  res.render("pumpViews/pumpEdit", {
    pump,
    header: `${pump.name} 에 대한 수정`,
  });
};

export const postPumpEdit = async (req, res) => {
  const { id } = req.params;
  const { free_flowRate, code, user, motor, coating, domestic, version } =
    req.body;
  const pump = Pump.exists({ _id: id });
  if (!pump) {
    return res
      .status(404)
      .render("404", { errorMessage: "수정할 펌프가 없습니다" });
  }
  await Pump.findByIdAndUpdate(id, {
    free_flowRate,
    code,
    user,
    motor,
    coating,
    domestic,
    version,
    lastEdit: Date.now(),
  });
  return res.redirect(`/pumps/${id}`);
};

export const getPumpDelete = async (req, res) => {
  const { id } = req.params;
  const pump = await Pump.findById(id);
  if (!pump) {
    return res.status(404).render("404");
  }
  /*if (String(video.owner) !== String(req.session.user._id)) {
    return res.status(403).redirect("/");
  }
  const user = await User.findById(req.session.user._id);*/
  await Pump.findByIdAndDelete(id);
  /*user.videos.pull(video.id);
  user.save();*/
  return res.redirect("/");
};
