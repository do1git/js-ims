const div__header = document.querySelector("header");

let PATHTOGO;

const whereHereIs = () => {
  const { pathname } = window.location;
  if (pathname === "/") {
    PATHTOGO = "/home-search";
  } else if (pathname === "/outbound") {
    PATHTOGO = "/outbound-search";
  }
};
const goToHeaderOriginal = (before) => {
  div__header.innerHTML = before;
};

const handleClickHeader = () => {
  const before = div__header.innerHTML;
  div__header.innerHTML = `<a href=${PATHTOGO} class="button--big"><i class="fas fa-search"></i><span>${before}<br>\xa0상세검색하기 &rarr;</span></a>`;
  // div__header.innerHTML = `<a href="/home-search" class="button--big"><i class="fas fa-search"></i><span>일정<br>\xa0상세검색하기 &rarr;</span></a>`;
  setTimeout(() => {
    div__header.innerHTML = before;
  }, 2000);
};

const init = () => {
  whereHereIs();
  div__header.addEventListener("click", handleClickHeader);
};

init();
