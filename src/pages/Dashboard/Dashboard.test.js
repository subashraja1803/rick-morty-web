import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Dashboard from '.';
import { fireEvent, render, screen } from '@testing-library/react';
import { getPageData } from '../../service';


jest.mock('../../service', () => ({
  getPageData: jest.fn(),
}));
jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));

const mockApiInfo = {
  prev: null,
  next: 2,
  pages: 40,
};

const mockCardData = [
  {
    id: 1,
    name: 'Evil Rick',
    },
    {
      id: 2,
      name: ' Evil Morty'
    }
]

const mockStore = configureStore([]);
const initialState = {
  rickMortyStore: {
    apiInfo: mockApiInfo,
    pageInfo: {
      pageType: 'character',
    },
    cardData: mockCardData,
  },
};
const store = mockStore(initialState);

describe('Dashboard', () => {
  getPageData.mockResolvedValue({ info: mockApiInfo, results: mockCardData });
  test('render Dashboard with correct props', () => {
    const { getByText } = render(
    <Provider store={store}>
      <Dashboard />
    </Provider>
    );
    expect(getByText('Rick and Morty')).toBeInTheDocument();
  });

  test('render Dashboard with correct props and api failed', () => {
    getPageData.mockRejectedValue(new Error);
    const { getByText } = render(
    <Provider store={store}>
      <Dashboard />
    </Provider>
    );
    expect(getByText('Rick and Morty')).toBeInTheDocument();
  });

  test('search and check results', () => {
    getPageData.mockResolvedValue({ info: mockApiInfo, results: mockCardData });
    const { getByPlaceholderText, getByText } = render(
    <Provider store={store}>
      <Dashboard />
    </Provider>
    );
    const searchBox = getByPlaceholderText('Input Search Text');
    fireEvent.change(searchBox, { target: { value: 'Evil' } });
    const searchButton = screen.getByText('Search');
    fireEvent.click(searchButton);

    expect(getByText('Evil Rick')).toBeInTheDocument();
  });

  test('search and check results and reject value', () => {
    getPageData.mockRejectedValue(new Error);
    const { getByPlaceholderText, getByText } = render(
    <Provider store={store}>
      <Dashboard />
    </Provider>
    );
    const searchBox = getByPlaceholderText('Input Search Text');
    fireEvent.change(searchBox, { target: { value: 'Evil' } });
    const searchButton = screen.getByText('Search');
    fireEvent.click(searchButton);
  });

  test('navigate to other pages', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
      );
      const location = getByText('Locations');
      fireEvent.click(location);
      expect(getByText('Locations')).toBeInTheDocument();
  })
});
