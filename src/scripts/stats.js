const userDataApi = 'https://appco-snowy.vercel.app/api/users';
const tableBody = document.querySelector('#table-body');
const loader = document.querySelector('#linear-progress');
const paginationContainer = document.querySelector('#pagination');

let currentPage = 1;
const limit = 16;
let cachedUsers = [];

const toggleLoader = (show) => {
  if (!loader) return;
  if (show) loader.classList.remove('hidden');
  else loader.classList.add('hidden');
};

const fetchUsers = () => {
  toggleLoader(true);
  return fetch(userDataApi)
    .then((res) =>
      res.ok ? res.json() : Promise.reject('Ошибка пользователей'),
    )
    .then((result) => {
      cachedUsers = result.data || [];
      return cachedUsers;
    })
    .catch(console.error);
};

const fetchUserStats = (id) =>
  fetch(`https://appco-snowy.vercel.app/api/users/statistics?userIds=${id}`)
    .then((res) => (res.ok ? res.json() : []))
    .then((stats) => ({
      id,
      clicks: stats.reduce((sum, el) => sum + Number(el.clicks || 0), 0),
      views: stats.reduce((sum, el) => sum + Number(el.page_views || 0), 0),
    }))
    .catch(() => ({ id, clicks: 0, views: 0 }));

const renderPagination = (totalUsers) => {
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
    if (currentPage > 1) {
      currentPage--;
      renderPageData();
    }
  });
  paginationContainer.append(prevArrow);

  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement('button');
    pageButton.textContent = i;
    pageButton.classList.add('pager__button');

    if (i === currentPage) {
      pageButton.classList.add('pager__button--active');
    }

    pageButton.addEventListener('click', () => {
      if (currentPage === i) return;
      currentPage = i;
      renderPageData();
    });

    paginationContainer.append(pageButton);
  }

  const nextArrow = document.createElement('button');
  nextArrow.classList.add('pager__arrow');
  nextArrow.disabled = currentPage === totalPages;
  nextArrow.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="28" viewBox="0 0 17 28" fill="none">
      <path d="M2 2L14 14L2 26" stroke="${currentPage === totalPages ? '#F1F1F1' : '#3A80BA'}" stroke-width="4" stroke-linecap="round"/>
    </svg>
  `;
  nextArrow.addEventListener('click', () => {
    if (currentPage < totalPages) {
      currentPage++;
      renderPageData();
    }
  });
  paginationContainer.append(nextArrow);
};

const renderPageData = () => {
  toggleLoader(true);

  const startIndex = (currentPage - 1) * limit;
  const endIndex = startIndex + limit;
  const usersForPage = cachedUsers.slice(startIndex, endIndex);

  Promise.all(usersForPage.map((u) => fetchUserStats(u.id))).then(
    (allStats) => {
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
          <td>${userStats.clicks.toLocaleString('ru-RU')}</td>
          <td>${userStats.views.toLocaleString('ru-RU')}</td>
        `;
        tableBody.append(row);
      });

      renderPagination(cachedUsers.length);
      toggleLoader(false);
    },
  );
};

const init = () => {
  fetchUsers().then((users) => {
    if (users && users.length > 0) {
      renderPageData();
    }
  });
};

init();
