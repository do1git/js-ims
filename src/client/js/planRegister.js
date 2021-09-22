const input__ordered_date = document.querySelector(`input[id="ordered_date"]`);
const input__planned_manufacturing_date = document.querySelector(
  `input[id="planned_manufacturing_date"]`
);
const input__planned_outbound_date = document.querySelector(
  `input[id="planned_outbound_date"]`
);
const submit = document.querySelector("input[type='submit']");
const errorSpan = document.querySelector(".jsError");

let milli__ordered_date = null;
let milli__planned_manufacturing_date = null;
let milli__planned_outbound_date = null;

const todayYYYY_MM_DD = () => {
  const date = new Date();
  const [year, month, day] = [
    date.getFullYear(),
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1,
    date.getDate() < 10 ? `0${date.getDate()}` : date.getDate(),
  ];
  return `${year}-${month}-${day}`;
};

const compare = (a, b, c) => {
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

const init = () => {
  input__ordered_date.value = todayYYYY_MM_DD();
  milli__ordered_date = Date.parse(todayYYYY_MM_DD());

  input__ordered_date.addEventListener("change", handle__ordered_date);
  input__planned_manufacturing_date.addEventListener(
    "change",
    handle__planned_manufacturing_date
  );
  input__planned_outbound_date.addEventListener(
    "change",
    handle__planned_outbound_date
  );
};

init();
