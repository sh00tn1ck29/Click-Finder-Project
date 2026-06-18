const loader = document.querySelector('#linear-progress');

export const toggleLoader = (show) => {
  if (!loader) return;
  if (show) {
    loader.classList.remove('hidden');
  } else {
    loader.classList.add('hidden');
  }
};
