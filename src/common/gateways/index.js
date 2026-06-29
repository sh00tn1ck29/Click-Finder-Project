const USER_DATA_API = 'https://appco-snowy.vercel.app/api/users';
const STATS_API = 'https://appco-snowy.vercel.app/api/users/statistics';

export const fetchUsers = (page, limit) => {
  return fetch(`${USER_DATA_API}?page=${page}&rowsPerPage=${limit}`)
    .then((res) =>
      res.ok ? res.json() : Promise.reject('Ошибка пользователей'),
    )
    .then((result) => {
      return {
        users: result.data || [],
        totalPages: result.totalPages || result.total_pages || 63,
      };
    })
    .catch((err) => {
      console.error(err);
      return { users: [], totalPages: 63 };
    });
};

export const fetchAllUsersStats = (idsArray) => {
  const idsQuery = idsArray.join(',');

  return fetch(`${STATS_API}?userIds=${idsQuery}`)
    .then((res) => (res.ok ? res.json() : Promise.reject('Ошибка статистики')))
    .then((result) => {
      return result || [];
    })
    .catch((err) => {
      console.error(err);
      return [];
    });
};
