const checkbox = Array.from(document.querySelectorAll(".container--invisible"));

function colorChange(input, label) {
  console.log(checkbox);
  if (input.checked === true) {
    label.classList.add("button--checked--reverse");
    input.checked = true;
  } else {
    label.classList.remove("button--checked--reverse");
    input.checked = false;
    delete input.checked;
  }
  console.log(`ColorChange to ${input.checked}`);
}

function handlechecked(e) {
  //e.target.classList;
  const label = document.querySelector(`label[for="${e.target.id}"]`);
  colorChange(e.target, label);
}

function init() {
  checkbox.forEach((e) => {
    colorChange(e, document.querySelector(`label[for="${e.id}"]`));
    e.addEventListener("change", handlechecked);
  });
}
init();
