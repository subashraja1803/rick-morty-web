import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import LocationDetailPage from '.';
import { getPageData } from '../../../service';

jest.mock('../../../service', () => ({
  getPageData: jest.fn(),
}));
jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));

window.scrollTo = jest.fn();

const mockSingelData = {
  name: 'Earth (C-137)',
  type: 'Planet',
  dimension: 'Dimension C-137',
  residents: [
    'https://rickandmortyapi.com/api/character/1',
    'https://rickandmortyapi.com/api/character/2',
  ],
};
const mockStore = configureStore([]);
const initialState = {
  rickMortyStore: {
    pageInfo: {
      pageType: 'location',
    },
    singleData: mockSingelData,
  },
};
const store = mockStore(initialState);

describe('LocationDetailPage Component', () => {
  getPageData.mockResolvedValue(mockSingelData);
  it('renders the component correctly', () => {
    const { getByText } = render(
      <Provider store={store}>
        <LocationDetailPage />
      </Provider>
    );

    expect(getByText('Earth (C-137)')).toBeInTheDocument();
  });

  it('navigates back when the Back button is clicked', () => {
    const navigate = jest.fn();
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(navigate);

    const { getByText } = render(
      <Provider store={store}>
        <LocationDetailPage />
      </Provider>
    );

    const backButton = getByText('Back');
    fireEvent.click(backButton);

    expect(navigate).toHaveBeenCalledWith('/location');
  });

  it('displays location details correctly', () => {
    const { getByText } = render(
      <Provider store={store}>
        <LocationDetailPage />
      </Provider>
    );

    expect(getByText('Type:')).toBeInTheDocument();
    expect(getByText('Planet')).toBeInTheDocument();
    expect(getByText('Dimension:')).toBeInTheDocument();
    expect(getByText('Dimension C-137')).toBeInTheDocument();
  });

});
