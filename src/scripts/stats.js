import { fetchUsers } from '../common/gateways/api.js';
import { renderPageData, toggleLoader } from './StatisticsTable/index.js';

let currentPage = 1;
const limit = 16;

const loadPageData = (page) => {
  toggleLoader(true);
  fetchUsers(page, limit).then(({ users, totalPages }) => {
    if (users.length > 0) {
      renderPageData(users, totalPages, page, handlePageChange);
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

