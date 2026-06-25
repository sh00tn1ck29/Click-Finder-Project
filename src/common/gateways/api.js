const USER_DATA_API = 'https://appco-snowy.vercel.app/api/users';
const STATS_API = 'https://appco-snowy.vercel.app/api/users/statistics';

export const fetchUsers = (page, limit) => {
  return fetch(`${USER_DATA_API}?page=${page}&rowsPerPage=${limit}`)
    .then((res) =>
      res.ok ? res.json() : Promise.reject('Ошибка пользователей'),
    )
    .then((result) => {
      const usersList = result.data || (Array.isArray(result) ? result : []);
      const total = result.totalPages || 63;
      return {
        users: usersList,
        totalPages: total,
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
    .then((res) => (res.ok ? res.json() : []))
    .then((result) => result.data || result || [])
    .catch((err) => {
      console.error(err);
      return [];
    });
};
