const inputs__worker = Array.from(document.querySelectorAll(".worker"));

const handleWorkerSelection = (i) => {
  const idName = i.target.id;
  const label = document.querySelector(`label[for="${idName}"]`);
  const checked = i.target.checked;

  if (checked) {
    label.classList.add("button--small--selected");
  } else {
    label.classList.remove("button--small--selected");
  }
};

const init = () => {
  inputs__worker.forEach((worker) => {
    worker.addEventListener("input", handleWorkerSelection);
  });
};

init();
