export const constructURL = (pageInfo, searchText, id) => {
  const {
    pageType, pageNo, filter,
  } = pageInfo || {};
  let url = `/${pageType}`;
  if (!id) {
    const urlParams = [];
    if (pageNo) urlParams.push(`page=${pageNo}`);
    if (searchText) urlParams.push(`name=${searchText}`);
    if (filter?.name && filter?.value) urlParams.push(`${filter.name}=${filter.value}`);
    if (urlParams.length > 0) url += `?${urlParams.join('&')}`;
  } else {
    url += `/${id}`;
  }
  return url;
};
