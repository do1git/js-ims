const div__departments = Array.from(
  document.querySelectorAll(".manage__form__department div")
);
const form = document.querySelector(".manage__form");
const input__keyword = form.querySelector("input[name='keyword']");
const input__user = form.querySelector("input[name='user']");
const input__motor = form.querySelector("input[name='motor']");
const input__department = form.querySelector("input[name='department']");
const ok = window.location.href.split("?")[1];
console.log(Boolean(ok));
let queries = {};

const restore = () => {
  if (ok) {
    origin = window.location.href.split("?")[1].split("&");
    origin.forEach((e) => {
      if (Boolean(e.split("=")[1])) {
        let name = e.split("=")[0];
        let value = e.split("=")[1];

        queries[name] = value;
      }
    });
    console.log(queries);
  }
  if (queries.keyword) {
    input__keyword.value = queries.keyword;
  }
  if (queries.user) {
    input__user.value = queries.user;
  }
  if (queries.motor) {
    input__motor.value = queries.motor;
  }
  if (queries.department) {
    const selected = queries.department;
    switch (selected) {
      case "%EB%8C%80%ED%98%95":
        div__departments[0].classList.add("manage__form__department__selected");
        break;
      case "%EB%AF%B8%EB%8B%88":
        div__departments[1].classList.add("manage__form__department__selected");
        break;
      case "%EB%8B%A4%EC%9D%B4%EC%95%84%ED%94%84%EB%9E%A8":
        div__departments[2].classList.add("manage__form__department__selected");
        break;
      case "%EA%B8%B0%ED%83%80":
        div__departments[3].classList.add("manage__form__department__selected");
        break;
    }
  }
};

const handleClick = (e) => {
  const dep = e.target.innerText;
  input__department.value = dep;
  form.submit();
};

const init = () => {
  if (ok) {
    restore();
  }
  div__departments.forEach((e) => {
    e.addEventListener("click", handleClick);
  });
};

init();
