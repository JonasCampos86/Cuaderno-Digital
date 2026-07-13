import "../styles/main.scss";

const openNotebookLink = document.querySelector("[data-open-notebook]");
const closeNotebookLink = document.querySelector("[data-close-notebook]");

if (openNotebookLink) {
  openNotebookLink.addEventListener("click", (event) => {
    event.preventDefault();

    const url = openNotebookLink.href;
    const coverPage = document.querySelector(".cover-page");
    const notebookCover = document.querySelector(".notebook-cover");

    if (!coverPage || !notebookCover) {
      window.location.href = url;
      return;
    }

    coverPage.classList.add("is-opening");

    notebookCover.addEventListener(
      "animationend",
      () => {
        window.location.href = url;
      },
      { once: true }
    );
  });
}

if (closeNotebookLink) {
  closeNotebookLink.addEventListener("click", (event) => {
    event.preventDefault();

    const url = closeNotebookLink.href;
    const closeCover = document.querySelector(".notebook-close-cover");
    const closeCoverPanel = document.querySelector(".notebook-close-cover__panel");

    if (!closeCover || !closeCoverPanel) {
      window.location.href = url;
      return;
    }

    closeCover.classList.add("is-closing");

    closeCoverPanel.addEventListener(
      "animationend",
      () => {
        window.location.href = url;
      },
      { once: true }
    );
  });
}