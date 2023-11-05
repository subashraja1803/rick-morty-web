import axios from 'axios';
import { constructURL } from '../utils/Utils';

const apiURL = 'https://rickandmortyapi.com/api';
export const getPageData = (pageInfo, searchText, id) => {
  const updatedURL = apiURL + constructURL(pageInfo, searchText, id);
  return axios.get(updatedURL).then(({ data }) => data).catch(() => console.error('API Error'));
};
