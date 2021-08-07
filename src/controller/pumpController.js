import Pump from "../models/Pump";

export const getPumpRegister = (req, res) => {
  res.render("pumpViews/pumpRegister");
};

export const postPumpRegister = async (req, res) => {
  const { name, user, flowRate, operation, purpose, structure, coating } =
    req.body;
  try {
    const newPump = await Pump.create({
      name,
      flowRate,
      operation,
      purpose,
      structure,
      coating,
      user,
    });
    return res.redirect("/manage");
  } catch (error) {
    console.log(error);
    return res.status(400).render("pumpViews/pumpRegister");
  }
};
export const getPumpView = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const pump = await Pump.findById(id);
  if (!pump) {
    return res.status(404).render("404");
  } else {
    return res.render("pumpViews/pumpView", { pump });
  }
};

export const getPumpEdit = async (req, res) => {
  const { id } = req.params;
  const pump = await Pump.findById(id);
  if (!pump) {
    return res.status(404).render("404");
  }
  /*if (String(video.owner) !== String(req.session.user._id)) {
    return res.status(403).redirect("/");
  }*/
  res.render("pumpViews/pumpEdit", { pump });
};
export const postPumpEdit = async (req, res) => {
  const { id } = req.params;
  const { name, user, flowRate, operation, purpose, structure, coating } =
    req.body;
  const pump = Pump.exists({ _id: id });
  console.log(req.body);
  if (!pump) {
    return res.status(404).render("404");
  }

  await Pump.findByIdAndUpdate(id, {
    name,
    user,
    flowRate,
    operation,
    purpose,
    structure,
    coating,
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
