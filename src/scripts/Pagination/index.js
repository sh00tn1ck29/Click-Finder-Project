const paginationContainer = document.querySelector('#pagination');

const getPaginationRange = (currentPage, totalPages) => {
  const range = [];

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) range.push(i);
    return range;
  }

  if (currentPage <= 4) {
    for (let i = 1; i <= 5; i++) range.push(i);
    range.push('...');
    range.push(totalPages);
    return range;
  }

  if (currentPage >= totalPages - 3) {
    range.push(1);
    range.push('...');
    for (let i = totalPages - 4; i <= totalPages; i++) range.push(i);
    return range;
  }

  range.push(1);
  range.push('...');
  range.push(currentPage - 1);
  range.push(currentPage);
  range.push(currentPage + 1);
  range.push('...');
  range.push(totalPages);
  return range;
};

export const renderPagination = (totalPages, currentPage, onPageChange) => {
  if (!paginationContainer) return;
  paginationContainer.innerHTML = '';

  const prevArrow = document.createElement('button');
  prevArrow.classList.add('pagination__arrow');
  prevArrow.disabled = currentPage === 1;
  prevArrow.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="28" viewBox="0 0 17 28" fill="none">
      <path d="M14.8284 2L2.82843 14L14.8284 26" stroke="${currentPage === 1 ? '#F1F1F1' : '#3A80BA'}" stroke-width="4" stroke-linecap="round"/>
    </svg>
  `;
  prevArrow.addEventListener('click', () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  });
  paginationContainer.append(prevArrow);

  const pageRange = getPaginationRange(currentPage, totalPages);

  pageRange.forEach((page) => {
    if (page === '...') {
      const dotsSpan = document.createElement('button');
      dotsSpan.textContent = '...';
      dotsSpan.classList.add('pagination__button');
      paginationContainer.append(dotsSpan);
    } else {
      const pageButton = document.createElement('button');
      pageButton.textContent = page;
      pageButton.classList.add('pagination__button');

      if (page === currentPage) {
        pageButton.classList.add('pagination__button--active');
      }

      pageButton.addEventListener('click', () => {
        if (currentPage !== page) onPageChange(page);
      });

      paginationContainer.append(pageButton);
    }
  });

  const nextArrow = document.createElement('button');
  nextArrow.classList.add('pagination__arrow');
  nextArrow.disabled = currentPage === totalPages;
  nextArrow.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="28" viewBox="0 0 17 28" fill="none">
      <path d="M2 2L14 14L2 26" stroke="${currentPage === totalPages ? '#F1F1F1' : '#3A80BA'}" stroke-width="4" stroke-linecap="round"/>
    </svg>
  `;
  nextArrow.addEventListener('click', () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  });
  paginationContainer.append(nextArrow);
};
