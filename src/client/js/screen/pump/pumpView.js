const form__history = document.querySelector(".pumpView__history__form");
const input__startDate = form__history.querySelector("input[name='startDate']");
const input__endDate = form__history.querySelector("input[name='endDate']");

const urlqueryToObj = () => {
  const queries = window.location.href.split("?")[1];
  const query = queries.split("&");
  const obj = {};
  query.forEach((q) => {
    const thing = q.split("=");
    obj[thing[0]] = thing[1];
  });
  return obj;
};

const restore = (queries) => {
  input__startDate.value = queries.startDate;
  input__endDate.value = queries.endDate;
};

const init = () => {
  if (window.location.href.split("?")[1]) {
    const queries = urlqueryToObj();
    restore(queries);
  }
};

init();
