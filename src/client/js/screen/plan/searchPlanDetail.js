const div__departments = Array.from(
  document.querySelectorAll(".searchPlanDetail__form__department > *")
);
const form = document.querySelector(".searchPlanDetail__form");
const input__department = form.querySelector("input[name='department']");
const input__startDate = form.querySelector("input[name='startDate']");
const input__endDate = form.querySelector("input[name='endDate']");
const searched = window.location.href.split("?")[1];

const queryGenerator = () => {
  let queries = {};
  const origin = window.location.href.split("?")[1].split("&");
  origin.forEach((e) => {
    if (Boolean(e.split("=")[1])) {
      let name = e.split("=")[0];
      let value = e.split("=")[1];

      queries[name] = value;
    }
  });
  return queries;
};

const restore = () => {
  const queries = queryGenerator();

  if (queries.startDate) {
    input__startDate.value = queries.startDate;
  }
  if (queries.endDate) {
    input__endDate.value = queries.endDate;
  }
  if (queries.department) {
    const selected = queries.department;
    switch (selected) {
      case "%EB%8C%80%ED%98%95":
        div__departments[0].classList.add(
          "searchPlanDetail__form__department__selected"
        );
        break;
      case "%EB%AF%B8%EB%8B%88":
        div__departments[1].classList.add(
          "searchPlanDetail__form__department__selected"
        );
        break;
      case "%EB%8B%A4%EC%9D%B4%EC%95%84%ED%94%84%EB%9E%A8":
        div__departments[2].classList.add(
          "searchPlanDetail__form__department__selected"
        );
        break;
      case "%EA%B8%B0%ED%83%80":
        div__departments[3].classList.add(
          "searchPlanDetail__form__department__selected"
        );
        break;
    }
  }
};

const handleClickDepartment = (e) => {
  const dep = e.target.innerText;
  input__department.value = dep;
  form.submit();
};

const restoreNotSearched = () => {
  const today = Date.now();
  const weekAgo = today - 1000 * 60 * 60 * 24 * 7;
  const d = new Date(weekAgo);
  const yyyy = d.getFullYear();
  const mm = d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
  const dd = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
  input__startDate.value = `${yyyy}-${mm}-${dd}`;
};

const init = () => {
  if (searched) {
    restore();
  } else {
    restoreNotSearched();
  }
  div__departments.forEach((div) => {
    div.addEventListener("click", handleClickDepartment);
  });
};

init();
