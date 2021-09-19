const radio = Array.from(document.querySelectorAll(`input[type="radio"]`));

let changed = null;
function colorChange(input, label) {
  if (input.checked === true) {
    console.log(changed);
    if (changed) {
      const changedLabel = document.querySelector(`label[for="${changed}"]`);
      changedLabel.classList.remove("blueBox--big--blue");
    }
    label.classList.add("blueBox--big--blue");
    changed = input.id;
  } else {
    label.classList.remove("blueBox--big--blue");
  }
  //console.log(`ColorChange to ${input.checked}`);
}

function handlechecked(e) {
  const label = document.querySelector(`label[for="${e.target.id}"]`);
  colorChange(e.target, label);
}

function init() {
  radio.forEach((e) => {
    e.addEventListener("change", handlechecked);
  });
}

init();
