const button__thumbDownload = document.querySelector(
  ".planView__pictures__thumbnail"
);
const ul = document.querySelector(".n1s2");
const data__file_thumbnail = ul.dataset.file_thumbnail;
const data__file_paths = ul.dataset.file_paths;

const init = () => {
  button__thumbDownload.href = data__file_thumbnail;
  button__thumbDownload.download = String(data__file_thumbnail);
  button__thumbDownload.click();
  console.log(button__thumbDownload.href);
};

init();
