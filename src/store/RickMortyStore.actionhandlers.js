import { RICK_MORTY_STORE_ACTIONS } from './constants';

export default class RickMortyActions {
  static setPageInfo(payload) {
    return {
      type: RICK_MORTY_STORE_ACTIONS.SET_PAGE_INFO,
      payload,
    };
  }

  static setCardData(payload) {
    return {
      type: RICK_MORTY_STORE_ACTIONS.SET_CARD_DATA,
      payload,
    };
  }

  static setSingleData(payload) {
    return {
      type: RICK_MORTY_STORE_ACTIONS.SET_SINGLE_DATA,
      payload,
    };
  }

  static setSearchText(payload) {
    return {
      type: RICK_MORTY_STORE_ACTIONS.SET_SEARCH_TEXT,
      payload,
    };
  }

  static setApiInfo(payload) {
    return {
      type: RICK_MORTY_STORE_ACTIONS.SET_API_INFO,
      payload,
    };
  }
}
