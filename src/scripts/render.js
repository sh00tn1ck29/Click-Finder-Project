import { fetchAllUsersStats } from '../common/api.js';
import { toggleLoader } from './dom.js';

const tableBody = document.querySelector('#table-body');
const paginationContainer = document.querySelector('#pagination');

const getPaginationRange = (currentPage, totalPages) => {
  const delta = 2;
  const range = [];

  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - delta && i <= currentPage + delta)
    ) {
      range.push(i);
    }
  }

  const result = [];
  let l;

  for (let i of range) {
    if (l) {
      if (i - l === 2) {
        result.push(l + 1);
      } else if (i - l > 2) {
        result.push('...');
      }
    }
    result.push(i);
    l = i;
  }

  return result;
};

export const renderPagination = (
  totalUsers,
  limit,
  currentPage,
  onPageChange,
) => {
  if (!paginationContainer) return;
  paginationContainer.innerHTML = '';

  const totalPages = Math.ceil(totalUsers / limit) || 1;

  const prevArrow = document.createElement('button');
  prevArrow.classList.add('pager__arrow');
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
      const dotsSpan = document.createElement('span');
      dotsSpan.textContent = '...';
      dotsSpan.classList.add('pager__dots');
      paginationContainer.append(dotsSpan);
    } else {
      const pageButton = document.createElement('button');
      pageButton.textContent = page;
      pageButton.classList.add('pager__button');

      if (page === currentPage) {
        pageButton.classList.add('pager__button--active');
      }

      pageButton.addEventListener('click', () => {
        if (currentPage !== page) onPageChange(page);
      });

      paginationContainer.append(pageButton);
    }
  });

  const nextArrow = document.createElement('button');
  nextArrow.classList.add('pager__arrow');
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

export const renderPageData = (
  cachedUsers,
  currentPage,
  limit,
  onPageChange,
) => {
  toggleLoader(true);

  const startIndex = (currentPage - 1) * limit;
  const endIndex = startIndex + limit;
  const usersForPage = cachedUsers.slice(startIndex, endIndex);
  const pageUserIds = usersForPage.map((u) => u.id);

  fetchAllUsersStats(pageUserIds).then((allStats) => {
    if (!tableBody) return;
    tableBody.innerHTML = '';

    usersForPage.forEach((user) => {
      const userStats = allStats.find(
        (s) => Number(s.id) === Number(user.id),
      ) || { clicks: 0, views: 0 };

      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${user.id}</td>
        <td>${user.first_name}</td>
        <td>${user.last_name}</td>
        <td>${user.email}</td>
        <td>${user.gender}</td>
        <td>${user.ip_address}</td>
        <td>${userStats.clicks}</td>
        <td>${userStats.views}</td>
      `;
      tableBody.append(row);
    });

    renderPagination(cachedUsers.length, limit, currentPage, onPageChange);
    toggleLoader(false);
  });
};
