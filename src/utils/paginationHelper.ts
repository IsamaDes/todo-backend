// Utility: pagination helper
 export const getPagination = (page: number, limit: number) => {
  const pageNumber = Math.max(1, page);
  const pageSize = Math.max(1, limit);
  const skip = (pageNumber - 1) * pageSize;
  return { skip, pageSize };
};
