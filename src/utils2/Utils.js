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
    url += `?${urlParams.join('&')}`;
  } else {
    url += `/${id}`;
  }
  return url;
};

export const decodeURLComponent = (url) => {
  const pageInfo = {};
  const splittedURL = url.split('?');
  const firstComponent = splittedURL[0];
  if (splittedURL[1]) {
    const pageParams = splittedURL[1].split('&');
    pageParams.forEach((param) => {
      const [name, value] = param.split('=');
      if (name === 'page') pageInfo.pageNo = value;
      else {
        pageInfo.filter = {
          name, value,
        };
      }
    });
  }
  const [, pageType] = firstComponent.split('/');
  pageInfo.pageType = pageType;
};
