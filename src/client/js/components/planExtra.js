const input__extra = document.querySelector("input[id='extra']");
const select__spart = document.querySelector(`select[id='spart']`);

const div__spartList = document.querySelector(`div#spartList`);
let div__spart = Array.from(document.querySelectorAll("div__spartList > *"));

let array__input__extra = [];

const dataArray__spareparts = JSON.parse(
  document.querySelector("form").dataset.spareparts
);

const edit__input__extra = (found) => {
  array__input__extra.push(found._id);

  const result = array__input__extra.toString();

  input__extra.value = result;
  console.log(input__extra.value);
  //중복, 삭제
};

const generateExtra = (found) => {
  const container = document.createElement("div");
  const div__img = document.createElement("div");
  const div__name = document.createElement("div");

  const img = document.createElement("img");
  const name = document.createElement("div");

  img.src = "/" + found.file;
  name.innerText = found.name;

  div__img.classList.add("planExtra__container__img");
  div__img.appendChild(img);
  div__name.appendChild(name);

  container.classList.add("planExtra__container");
  container.appendChild(div__img);
  container.appendChild(div__name);
  div__spartList.append(container);

  //나중에 삭제할때
  //div__spart = Array.from(document.querySelectorAll("#div__spartList > *"));
  //init();
};

const clickSpart = (e) => {
  const id__extra = e.target.value;
  const found = dataArray__spareparts.find((i) => i._id === id__extra);
  if (found !== null) {
    generateExtra(found);
    edit__input__extra(found);
  }
};

// const clickMadeSpart = (e) => {
//   console.log(e);
// };

const init = () => {
  select__spart.addEventListener("change", clickSpart);
  //   console.log(`MADE DIV`, div__spart);
  //   div__spart.forEach((element) => {
  //     element.addEventListener("click", clickMadeSpart);
  //   });
};

init();
