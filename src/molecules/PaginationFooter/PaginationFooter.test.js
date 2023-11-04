import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import PaginationFooter from '.';
import { getPageData } from '../../service';

jest.mock('../../service', () => ({
  getPageData: jest.fn(),
}));

const initialState = {
  rickMortyStore: {
    apiInfo: {
      prev: 1,
      next: 3,
      pages: 5,
    },
    searchText: 'TestSearch',
    pageInfo: {
      pageNo: 2,
    },
  },
};
const mockStore = configureStore([]);
const store = mockStore(initialState);

describe('PaginationFooter Component', () => {
  test('renders PaginationFooter component', () => {
    const { getByText } = render(
      <Provider store={store}>
        <PaginationFooter />
      </Provider>
    );

    const prevPageButton = getByText('Previous Page');
    const nextPageButton = getByText('Next Page');
    const pageSelect = getByText('Page:');

    expect(prevPageButton).toBeInTheDocument();
    expect(nextPageButton).toBeInTheDocument();
    expect(pageSelect).toBeInTheDocument();
  });

  test('handles click event on "Previous Page" button', () => {
    const { getByText } = render(
      <Provider store={store}>
        <PaginationFooter />
      </Provider>
    );
    getPageData.mockResolvedValue({
      info: { prev: null, next: 2 },
      results: [{
        name: 'Rick',
        id: 1
      }]
    });

    const prevPageButton = getByText('Previous Page');
    fireEvent.click(prevPageButton);
    expect(getPageData).toHaveBeenCalled();
  });

  test('handles click event on "Previous Page" button and api fails', () => {
    const { getByText } = render(
      <Provider store={store}>
        <PaginationFooter />
      </Provider>
    );
    getPageData.mockRejectedValue(new Error);

    const prevPageButton = getByText('Previous Page');
    fireEvent.click(prevPageButton);
    expect(getPageData).toHaveBeenCalled();
  });

  test('handles click event on "Next Page" button', () => {
    const { getByText } = render(
      <Provider store={store}>
        <PaginationFooter />
      </Provider>
    );

    getPageData.mockResolvedValue({
      info: { prev: null, next: 2 },
      results: [{
        name: 'Rick',
        id: 1
      }]
    });

    const nextPageButton = getByText('Next Page');
    fireEvent.click(nextPageButton);

    expect(getPageData).toHaveBeenCalled();
  });

});
