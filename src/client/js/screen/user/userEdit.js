const form = document.querySelector("form");

const input__avatar = form.querySelector("input[name='avatar']");
const input__avatarDefault = form.querySelector("input[name='avatarDefault']");

const div__avatar = form.querySelector(".userEdit__avatar");

const span__default = form.querySelector(".userEdit__avatar__default span");

const data__user = JSON.parse(form.dataset.user);

const button__gotoDefault = form.querySelector(
  ".userEdit__avatar__gotoDefault"
);
const img__avatar = div__avatar.querySelector("img");

const handleInputAvatar = (e) => {
  img__avatar.src = URL.createObjectURL(e.target.files[0]);
  if (button__gotoDefault) {
    button__gotoDefault.classList.add("invisible");
  } else {
    span__default.classList.add("invisible");
  }
  input__avatar.classList.add("invisible");
};

const handleButtonDefault = (e) => {
  img__avatar.src = `/static/statics/defaultProfile.jpeg`;
  e.target.classList.add("invisible");
  input__avatar.classList.add("invisible");
  input__avatarDefault.value = "static/statics/defaultProfile.jpeg";
};
const restore = () => {
  const options__grade = form.querySelectorAll("select[name='grade'] option");
  options__grade.forEach((i) => {
    if (i.value === data__user.grade) {
      i.selected = true;
    }
  });

  const options__department = form.querySelectorAll(
    "select[name='department'] option"
  );
  options__department.forEach((i) => {
    if (i.value === data__user.department) {
      i.selected = true;
    }
  });

  const input__permission_plan = form.querySelector(
    `input[id="permission_plan_${data__user.permission_plan}"]`
  );
  input__permission_plan.checked = true;

  const input__permission_user = form.querySelector(
    `input[id="permission_user_${data__user.permission_user}"]`
  );
  input__permission_user.checked = true;
};

const init = () => {
  restore();
  input__avatar.addEventListener("input", handleInputAvatar);
  if (button__gotoDefault) {
    button__gotoDefault.addEventListener("click", handleButtonDefault);
  }
};

init();
