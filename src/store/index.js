import { handleActions } from 'redux-actions';
import { RICK_MORTY_STORE_ACTIONS } from './constants';

const initialState = {
  showLoader: false,
  pageInfo: {
    pageType: 'character',
    pageNo: 1,
    filter: {},
  },
  searchText: '',
  cardData: [],
  apiInfo: {},
  singleData: {},
};

export default handleActions({
  [RICK_MORTY_STORE_ACTIONS.TOGGLE_LOADER]: (state, { payload }) => ({
    ...state, showLoader: payload,
  }),
  [RICK_MORTY_STORE_ACTIONS.SET_CARD_DATA]: (state, { payload }) => ({
    ...state, cardData: payload,
  }),
  [RICK_MORTY_STORE_ACTIONS.SET_SINGLE_DATA]: (state, { payload }) => ({
    ...state, singleData: payload,
  }),
  [RICK_MORTY_STORE_ACTIONS.SET_SEARCH_TEXT]: (state, { payload }) => ({
    ...state, searchText: payload,
  }),
  [RICK_MORTY_STORE_ACTIONS.SET_API_INFO]: (state, { payload }) => ({
    ...state, apiInfo: payload,
  }),
  [RICK_MORTY_STORE_ACTIONS.SET_PAGE_INFO]: (state, { payload }) => ({
    ...state,
    pageInfo: { ...state.pageInfo, ...payload },
  }),
}, initialState);
