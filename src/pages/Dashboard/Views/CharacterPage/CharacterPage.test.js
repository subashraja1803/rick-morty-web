import React from 'react';
import { render } from '@testing-library/react';
import CharacterPage from '.';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const setPageInfo = jest.fn();
const setCardData = jest.fn();
const setApiInfo = jest.fn();
const setSearchText = jest.fn();

const initialState = {
  rickMortyStore: {
    pageInfo: {
      filter: {},
    },
    cardData: [],
  },
};
const mockStore = configureStore([]);

describe('CharacterPage', () => {
  const store = mockStore(initialState);
  test('renders CharacterPage component with default filter', () => {
    const { getByText } = render(
      <Provider store={store}>
        <CharacterPage
          setPageInfo={setPageInfo}
          setCardData={setCardData}
          setApiInfo={setApiInfo}
          setSearchText={setSearchText}
        />
      </Provider>
    );

    const applyFilterButton = getByText('Apply Filter');
    const clearFilterButton = getByText('Clear Filter');
    const filterTypeInput = getByText('Choose Filter Type');
    const filterValueInput = getByText('Choose Filter Value');
    const noDataFoundText = getByText('No Data Found');

    expect(applyFilterButton).toBeInTheDocument();
    expect(clearFilterButton).toBeInTheDocument();
    expect(filterTypeInput).toBeInTheDocument();
    expect(filterValueInput).toBeInTheDocument();
    expect(noDataFoundText).toBeInTheDocument();
  });
});
