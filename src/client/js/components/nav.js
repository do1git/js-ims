const init = () => {
  const paths = window.location.pathname;
  const pathName = paths.split("/")[1];
  const path = "/" + paths.split("/")[1];
  let box;

  if (Boolean(pathName)) {
    box = document.querySelector(`.header__menu__${pathName}`);
  } else {
    box = document.querySelector(".header__menu__plan");
  }

  switch (path) {
    case "/":
      box.classList.add("header__currentTab");
    case "/done":
      box.classList.add("header__currentTab");
    case "/outbound":
      box.classList.add("header__currentTab");
    case "/manage":
      box.classList.add("header__currentTab");
    case "/etc":
      box.classList.add("header__currentTab");
    default:
  }
};

init();
