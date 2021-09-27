export const radioRestore = () => {
  const form__data = document.querySelector("form").dataset;
  const keys = Object.keys(form__data);

  keys.forEach((i) => {
    const value = form__data[i];
    const inputs = Array.from(document.querySelectorAll(`input[name="${i}"]`));
    inputs.forEach((e) => {
      if (e.value === value) {
        e.checked = true;
      }
    });
  });
};
