import { fetchAllUsersStats } from '../../common/gateways/index.js';
import { renderPagination } from '../Pagination/index.js';

const tableBody = document.querySelector('#table-body');

export const renderPageData = (
  usersForPage,
  totalPages,
  currentPage,
  onPageChange,
) => {
  const pageUserIds = usersForPage.map((u) => u.id);

  fetchAllUsersStats(pageUserIds).then((statsList) => {
    if (!tableBody) return;
    tableBody.innerHTML = '';

    const safeStats = Array.isArray(statsList) ? statsList : [];

    usersForPage.forEach((user) => {
      const userStatsRecords = safeStats.filter(
        (el) => Number(el.user_id || el.userId || el.id) === Number(user.id),
      );

      const clicks = userStatsRecords.reduce(
        (sum, el) => sum + Number(el.clicks || 0),
        0,
      );
      const views = userStatsRecords.reduce(
        (sum, el) => sum + Number(el.page_views || 0),
        0,
      );

      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${user.id}</td>
        <td>${user.first_name}</td>
        <td>${user.last_name}</td>
        <td>${user.email}</td>
        <td>${user.gender}</td>
        <td>${user.ip_address}</td>
        <td>${clicks}</td>
        <td>${views}</td>
      `;
      tableBody.append(row);
    });

    renderPagination(totalPages, currentPage, onPageChange);
  });
};
