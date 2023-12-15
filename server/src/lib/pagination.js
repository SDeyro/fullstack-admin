const generateSortFormat = sort => {
  if (!sort) {
    return { updatedAt: -1 };
  }

  const sortParsed = JSON.parse(sort);

  return {
    [sortParsed.field || 'updatedAt']: sortParsed.sort === 'asc' ? 1 : -1,
  };
};

const generateSearchQuery = (search, baseQuery) => {
  const defaultQuery = baseQuery;

  if (!search) {
    return defaultQuery;
  }

  return {
    ...defaultQuery,
    $or: [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
      { country: { $regex: search, $options: 'i' } },
      { cost: { $regex: search, $options: 'i' } },
    ],
  };
};

export { generateSortFormat, generateSearchQuery };
