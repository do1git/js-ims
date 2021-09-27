let status__current;
let milli__ordered_date = null;
let milli__planned_manufacturing_date = null;
let milli__manufacturing_date = null;
let milli__planned_outbound_date = null;
let milli__outbound_date = null;

const form = document.querySelector("form");

const data__status = document.querySelector(".status").dataset.status;
const data__ordered_date =
  document.querySelector(".ordered_date").dataset.ordered_date;
const data__planned_manufacturing_date = document.querySelector(
  ".planned_manufacturing_date"
).dataset.planned_manufacturing_date;
const data__manufacturing_date = document.querySelector(".manufacturing_date")
  .dataset.manufacturing_date;
const data__planned_outbound_date = document.querySelector(
  ".planned_outbound_date"
).dataset.planned_outbound_date;
const data__outbound_date =
  document.querySelector(".outbound_date").dataset.outbound_date;
const data__packaging = form.dataset.packaging;

const input__ordered_date = document.querySelector(".ordered_date input");
const input__planned_manufacturing_date = document.querySelector(
  ".planned_manufacturing_date input"
);
const input__manufacturing_date = document.querySelector(
  ".manufacturing_date input"
);
const input__planned_outbound_date = document.querySelector(
  ".planned_outbound_date input"
);
const input__outbound_date = document.querySelector(".outbound_date input");
const input__status = Array.from(
  document.querySelectorAll(`.status input[name="status"]`)
);

const button__manufacturing_date = document.querySelector(
  ".manufacturing_date button"
);
const button__outbound_date = document.querySelector(".outbound_date button");
const submit = document.querySelector("input[type='submit']");
const errorSpan = document.querySelector(".jsError");

const options__package = Array.from(
  document.querySelector("select[name='packaging']")
);

const restore = () => {
  input__ordered_date.value = data__ordered_date.split("T")[0];
  input__planned_manufacturing_date.value =
    data__planned_manufacturing_date.split("T")[0];
  if (data__manufacturing_date) {
    input__manufacturing_date.value = data__manufacturing_date.split("T")[0];
  }
  input__planned_outbound_date.value =
    data__planned_outbound_date.split("T")[0];
  if (data__outbound_date) {
    input__outbound_date.value = data__outbound_date.split("T")[0];
  }
  const input__status = document.querySelector(
    `.status input[id="${data__status}"]`
  );
  status__current = data__status;
  handleStatus();
  input__status.checked = true;

  if (Boolean(data__ordered_date) === true) {
    milli__ordered_date = Date.parse(data__ordered_date);
  }
  if (Boolean(data__planned_manufacturing_date) === true) {
    milli__planned_manufacturing_date = Date.parse(
      data__planned_manufacturing_date
    );
  }
  if (Boolean(data__manufacturing_date) === true) {
    milli__manufacturing_date = Date.parse(data__manufacturing_date);
  }
  if (Boolean(data__planned_outbound_date) === true) {
    milli__planned_outbound_date = Date.parse(data__planned_outbound_date);
  }
  if (Boolean(data__outbound_date) === true) {
    milli__outbound_date = Date.parse(data__outbound_dates);
  }

  options__package.forEach((e) => {
    if (e.value === data__packaging) {
      e.selected = true;
    }
  });
};

const handleButtonClick = (e) => {
  const className = e.path[1].classList.value;
  console.log(className);
  const data = document.querySelector(`.planned_${className} input`).value;
  if (className === "manufacturing_date") {
    milli__manufacturing_date = Date.parse(data);
  } else if (className === "outbound_date") {
    milli__outbound_date = Date.parse(data);
  }
  compare(milli__ordered_date, milli__manufacturing_date, milli__outbound_date);
  document.querySelector(`.${className} input`).value = data;
};

const handleStatusWait = () => {
  const div__manufacturing_date = document.querySelector(".manufacturing_date");
  const div__outbound_date = document.querySelector(".outbound_date");

  compare(milli__ordered_date, milli__ordered_date, milli__ordered_date);
  div__manufacturing_date.classList.add("no__click");
  div__outbound_date.classList.add("no__click");
};
const handleStatusDone = () => {
  const div__manufacturing_date = document.querySelector(".manufacturing_date");
  const div__outbound_date = document.querySelector(".outbound_date");

  compare(
    milli__ordered_date,
    milli__manufacturing_date,
    milli__manufacturing_date
  );
  div__manufacturing_date.classList.remove("no__click");
  div__outbound_date.classList.add("no__click");
};
const handleStatusOB = () => {
  const div__manufacturing_date = document.querySelector(".manufacturing_date");
  const div__outbound_date = document.querySelector(".outbound_date");
  div__manufacturing_date.classList.remove("no__click");
  div__outbound_date.classList.remove("no__click");
};

const handleStatus = () => {
  switch (status__current) {
    case "outbound":
      handleStatusOB();
      break;
    case "wait":
      handleStatusWait();
      break;
    case "done":
      handleStatusDone();
      break;
    default:
      handleStatusWait();
  }
};

const handle__ordered_date = (e) => {
  milli__ordered_date = Date.parse(e.target.value);

  compare(
    milli__ordered_date,
    milli__planned_manufacturing_date,
    milli__planned_outbound_date
  );
};
const handle__planned_manufacturing_date = (e) => {
  milli__planned_manufacturing_date = Date.parse(e.target.value);

  compare(
    milli__ordered_date,
    milli__planned_manufacturing_date,
    milli__planned_outbound_date
  );
};
const handle__planned_outbound_date = (e) => {
  milli__planned_outbound_date = Date.parse(e.target.value);

  compare(
    milli__ordered_date,
    milli__planned_manufacturing_date,
    milli__planned_outbound_date
  );
};
const handle__manufacturing_date = (e) => {
  milli__manufacturing_date = Date.parse(e.target.value);

  compare(milli__ordered_date, milli__manufacturing_date, milli__outbound_date);
};
const handle__outbound_date = (e) => {
  milli__outbound_date = Date.parse(e.target.value);

  compare(milli__ordered_date, milli__manufacturing_date, milli__outbound_date);
};

const compare = (a, b, c) => {
  console.log(a, b, c);
  console.log(a < b, b < c);
  if (a !== null && b !== null && c !== null) {
    if (a <= b && b <= c) {
      if (submit.classList.value === "no_click") {
        submit.classList.remove("no_click");
        errorSpan.classList.add("invisible");
      }
      return 0;
    } else {
      submit.classList.add("no_click");

      errorSpan.classList.remove("invisible");
      //errorSpan.innerText = "주문일<생산일<출고일 순서를 확인해주세요";
    }
  }
};
const init = () => {
  restore();
  button__manufacturing_date.addEventListener("click", handleButtonClick);
  button__outbound_date.addEventListener("click", handleButtonClick);

  input__ordered_date.addEventListener("change", handle__ordered_date);
  input__planned_manufacturing_date.addEventListener(
    "change",
    handle__planned_manufacturing_date
  );
  input__manufacturing_date.addEventListener(
    "change",
    handle__manufacturing_date
  );
  input__planned_outbound_date.addEventListener(
    "change",
    handle__planned_outbound_date
  );
  input__outbound_date.addEventListener("change", handle__outbound_date);

  input__status[0].addEventListener("change", handleStatusWait);
  input__status[1].addEventListener("change", handleStatusDone);
  input__status[2].addEventListener("change", handleStatusOB);
};

init();
