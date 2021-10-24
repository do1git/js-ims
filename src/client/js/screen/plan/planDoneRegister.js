const input__photos = document.querySelector("input[name='photos']");
const div__photoContainer = document.querySelector(
  ".doneRegister__photoContainer"
);
let div__photoEach;
let buttons__star;

const handleInputPhotos = (e) => {
  div__photoContainer.innerHTML = "";
  const files = e.target.files;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const div = document.createElement("div");
    const img = document.createElement("img");
    const div__star = document.createElement("div");

    const input__star = document.createElement("input");
    const label__star = document.createElement("label");

    img.src = URL.createObjectURL(file);

    label__star.innerHTML = '<i class="fas fa-star"></i>';
    input__star.type = "radio";
    input__star.name = "thumbnail";
    input__star.required = true;
    input__star.value = file.name;
    input__star.classList.add(`number-${i}`);
    label__star.classList.add(`number-${i}`);
    div__star.appendChild(label__star);
    div__star.appendChild(input__star);
    div__star.classList.add(
      "doneRegister__photoContainer__each__icon__thumbnail",
      "doneRegister__photoContainer__each__icon"
    );

    div.appendChild(img);
    div.appendChild(div__star);
    div.classList.add("doneRegister__photoContainer__each");

    div__photoContainer.append(div);
  }
  init();
};

const handleButtonStarPick = (e) => {
  buttons__star.forEach((each) => {
    const className = each.classList[0];
    const label = document.querySelector(`label.${className}`);
    const checked = each.checked;
    if (checked) {
      label.classList.add(
        "doneRegister__photoContainer__each__icon__thumbnail--selected"
      );
    } else {
      label.classList.remove(
        "doneRegister__photoContainer__each__icon__thumbnail--selected"
      );
    }
  });
};

const init = () => {
  div__photoEach = Array.from(
    document.querySelectorAll(".doneRegister__photoContainer__each")
  );
  buttons__star = Array.from(
    document.querySelectorAll(
      ".doneRegister__photoContainer__each__icon__thumbnail input"
    )
  );

  if (buttons__star) {
    buttons__star.forEach((e) => {
      e.addEventListener("input", handleButtonStarPick);
    });
  }
};

input__photos.addEventListener("input", handleInputPhotos);
init();
