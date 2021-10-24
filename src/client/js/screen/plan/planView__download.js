const container__pictures = document.querySelector(
  ".planView__pictures__container"
);

const data__plan = JSON.parse(document.querySelector(".n1s2").dataset.plan);

const img__pictures = Array.from(container__pictures.querySelectorAll("img"));

const button__goToEdit = document.querySelector(
  ".planView__pictures .header--small"
);

const button__download = document.querySelector(
  ".planView__pictures__container__each__download"
);
const button__download__span = button__download.querySelector("span");
const button__download__i = button__download.querySelector("i");

let MODE__DOWNLOAD = false;

const handleImgClick = (e) => {
  console.log(e.target.src);
  const code__picture = e.target.src.split("/")[6].split(".")[0];
  console.log(code__picture);
  const a = document.createElement("a");
  a.href = e.target.src;

  a.download = `${data__plan.model.name}-${data__plan.approved_id}의 ${code__picture}`;
  document.body.appendChild(a);
  a.click();
};

const handleDownloadClick = () => {
  if (!MODE__DOWNLOAD) {
    button__download__span.innerHTML = "사진을 누르면<br>다운로드 됩니다";
    button__download__i.classList.add(
      "planView__pictures__container__each__download--green"
    );
    img__pictures.forEach((pic) => {
      pic.addEventListener("click", handleImgClick);
    });
    MODE__DOWNLOAD = true;
  } else {
    button__download__span.innerHTML = "사진목록<br>다운로드하기&rarr;";
    button__download__i.classList.remove(
      "planView__pictures__container__each__download--green"
    );
    img__pictures.forEach((pic) => {
      pic.removeEventListener("click", handleImgClick);
    });
    MODE__DOWNLOAD = false;
  }
};

const handleGoToEdit = () => {
  // 방식을 고려해볼 필요 doneRegister를 한번 더 돌리면 되지않을까
  const before = button__goToEdit.innerHTML;
  button__goToEdit.innerHTML = `<a href=/plans/${data__plan._id}/editPic class="button--big"><i class="fas fa-search"></i><span>${before}<br>\xa0편집하기 &rarr;</span></a>`;
  setTimeout(() => {
    button__goToEdit.innerHTML = before;
  }, 2000);
};

const init = () => {
  button__download.addEventListener("click", handleDownloadClick);
  button__goToEdit.addEventListener("click", handleGoToEdit);
};

init();
