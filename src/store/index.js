import { handleActions } from 'redux-actions';

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

export const RICK_MORTY_STORE_ACTIONS = {
  TOGGLE_LOADER: 'RICK_MORTY_STORE_TOGGLE_LOADER',
  SET_PAGE_INFO: 'RICK_MORTY_STORE_SET_PAGE_INFO',
  SET_CARD_DATA: 'RICK_MORTY_STORE_SET_CARD_DATA',
  SET_API_INFO: 'RICK_MORTY_STORE_SET_API_INFO',
  SET_SEARCH_TEXT: 'RICK_MORTY_STORE_SET_SEARCH_TEXT',
  SET_SINGLE_DATA: 'RICK_MORTY_STORE_SET_SINGLE_DATA',
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
