import { fetchUsers } from '../common/api.js';
import { toggleLoader } from './dom.js';
import { renderPageData } from './render.js';

let currentPage = 1;
const limit = 16;
let cachedUsers = [];

const handlePageChange = (newPage) => {
  currentPage = newPage;
  renderPageData(cachedUsers, currentPage, limit, handlePageChange);
};

const init = () => {
  toggleLoader(true);
  fetchUsers().then((users) => {
    cachedUsers = users;
    if (cachedUsers.length > 0) {
      renderPageData(cachedUsers, currentPage, limit, handlePageChange);
    } else {
      toggleLoader(false);
    }
  });
};

init();
