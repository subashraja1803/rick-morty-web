import axios from 'axios';
import urls from './url';
import { constructURL } from '../Utils/Utils';

const apiURL = 'https://rickandmortyapi.com/api';
export const getPageData = (pageInfo, searchText, id) => {
  const updatedURL = apiURL + constructURL(pageInfo, searchText, id);
  return axios.get(updatedURL).then(({ data }) => data).catch(() => console.error('API Error'));
};
export const getCharacters = () => axios.get(urls.character).then(({ data }) => data);
export const getLocations = () => axios.get(urls.location).then(({ data }) => data);
export const getEpisodes = () => axios.get(urls.episode).then(({ data }) => data);
