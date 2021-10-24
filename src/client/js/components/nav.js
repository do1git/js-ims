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
      break;
    case "/home-search":
      document
        .querySelector(`.header__menu__plan`)
        .classList.add("header__currentTab");
      break;
    case "/done":
      box.classList.add("header__currentTab");
      break;
    case "/outbound":
      box.classList.add("header__currentTab");
      break;
    case "/outbound-search":
      document
        .querySelector(`.header__menu__outbound`)
        .classList.add("header__currentTab");
      break;
    case "/manage":
      box.classList.add("header__currentTab");
      break;
    case "/etc":
      box.classList.add("header__currentTab");
      break;
    default:
  }
};

init();
