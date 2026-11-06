document.addEventListener('submit', function (event) {
  const button = event.target.querySelector('[data-submit-state]');
  if (!button) {
    return;
  }
  const text = button.dataset.submitState;
  button.innerHTML = `<i class="fa-solid fa-spinner-third fa-fw fa-spin"></i> ${text}`;
  button.classList.toggle('disabled');
});
