import { fetchUsers } from '../common/gateways/index.js';
import { renderPageData } from './StatisticsTable/index.js';

const loader = document.querySelector('#linear-progress');

export const toggleLoader = (show) => {
  if (!loader) return;
  if (show) {
    loader.classList.remove('hidden');
  } else {
    loader.classList.add('hidden');
  }
};

let currentPage = 1;
const limit = 16;

const loadPageData = (page) => {
  toggleLoader(true);
  fetchUsers(page, limit).then((response) => {
    if (response && response.users && response.users.length > 0) {
      renderPageData(
        response.users,
        response.totalPages,
        page,
        handlePageChange,
      );
      toggleLoader(false);
    } else {
      toggleLoader(false);
    }
  });
};

const handlePageChange = (newPage) => {
  currentPage = newPage;
  loadPageData(currentPage);
};

const init = () => {
  if (window.location.pathname.includes('/index.html')) {
    const cleanPath = window.location.pathname.replace('/index.html', '/');
    window.history.replaceState(
      {},
      document.title,
      cleanPath + window.location.search,
    );
  }
  loadPageData(currentPage);
};

init();

