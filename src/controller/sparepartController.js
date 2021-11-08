import Sparepart from "../models/Sparepart";

export const getSparepartsView = async (req, res, next) => {
  const spareparts = await Sparepart.find({});
  res.render("sparepartViews/sparepartsView", {
    header: "소모품 목록",
    spareparts,
  });
};

export const getSparepartRegister = (req, res, next) => {
  res.render("sparepartViews/sparepartRegister", { header: "소모품 등록하기" });
};

export const postSparepartRegister = async (req, res, next) => {
  let file;
  if (!req.file) {
    file = "static/statics/unknown.png";
  } else {
    file = req.file.path;
  }
  const { name } = req.body;

  console.log(`THIS IS ${file}, ${name}`);
  try {
    await Sparepart.create({
      name,
      file,
      lastEdit: Date.now(),
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.render("404", {
        errorMessage: "중복된 정보가 있습니다",
      });
    }
  }
  req.flash("success", `소모품 ${name}의 등록이 완료됐습니다`);
  res.redirect("/pumps/sparepart");
};
