import { getPaginationRange } from './utils/index.js';

const paginationContainer = document.querySelector('#pagination');

const createArrowButton = (direction, isDisabled, onClick) => {
  const arrow = document.createElement('button');
  arrow.classList.add('pagination__arrow');
  arrow.disabled = isDisabled;

  const isLeft = direction === 'left';
  const strokeColor = isDisabled ? '#F1F1F1' : '#3A80BA';
  const pathD = isLeft ? 'M14.8284 2L2.82843 14L14.8284 26' : 'M2 2L14 14L2 26';

  arrow.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="28" viewBox="0 0 17 28" fill="none">
      <path d="${pathD}" stroke="${strokeColor}" stroke-width="4" stroke-linecap="round"/>
    </svg>
  `;

  arrow.addEventListener('click', onClick);
  return arrow;
};

export const renderPagination = (totalPages, currentPage, onPageChange) => {
  const total = Number(totalPages);
  const current = Number(currentPage);

  paginationContainer.innerHTML = '';

  const prevArrow = createArrowButton('left', current === 1, () => {
    onPageChange(current - 1);
  });
  paginationContainer.append(prevArrow);

  const pageRange = getPaginationRange(current, total);

  pageRange.forEach((page) => {
    const pageButton = document.createElement('button');
    pageButton.textContent = page;
    pageButton.classList.add('pagination__button');

    if (page === '...') {
      paginationContainer.append(pageButton);
    } else {
      const pageNumber = Number(page);
      if (pageNumber === current) {
        pageButton.classList.add('pagination__button--active');
      }
      pageButton.addEventListener('click', () => {
        if (current !== pageNumber) onPageChange(pageNumber);
      });
      paginationContainer.append(pageButton);
    }
  });

  const nextArrow = createArrowButton('right', current === total, () => {
    onPageChange(current + 1);
  });
  paginationContainer.append(nextArrow);
};
