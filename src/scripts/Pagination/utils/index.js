export const getPaginationRange = (currentPage, totalPages) => {
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
