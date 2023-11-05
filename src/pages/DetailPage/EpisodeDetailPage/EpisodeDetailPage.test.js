import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';


import EpisodeDetailPage from '.';
import { getPageData } from '../../../service';

jest.mock('../../../service', () => ({
  getPageData: jest.fn(),
}));
jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));

window.scrollTo = jest.fn();

const mockSingleData = {
  name: 'Pilot',
  air_date: 'December 2, 2013',
  episode: 'S01E01',
  characters: [
    'https://rickandmortyapi.com/api/character/1',
    'https://rickandmortyapi.com/api/character/2',
  ],
};

const mockStore = configureStore([]);
const initialState = {
  rickMortyStore: {
    pageInfo: {
      pageType: 'episode',
    },
    singleData: mockSingleData,
  },
};
const store = mockStore(initialState);

describe('EpisodeDetailPage', () => {
  getPageData.mockResolvedValue(mockSingleData);
  it('renders the component correctly', () => {
    const { getByText } = render(
      <Provider store={store}>
        <EpisodeDetailPage />
      </Provider>
    );

    expect(getByText('Pilot')).toBeInTheDocument();
  });

  it('navigates back when the Back button is clicked', () => {
    const navigate = jest.fn();
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(navigate);
    const { getByText } = render(
      <Provider store={store}>
        <EpisodeDetailPage />
      </Provider>
    );

    const backButton = getByText('Back');
    fireEvent.click(backButton);
    expect(navigate).toHaveBeenCalledWith('/episode');
  });

  it('displays episode details correctly', () => {
    const { getByText } = render(
      <Provider store={store}>
        <EpisodeDetailPage />
      </Provider>
    );

    expect(getByText('Air Date:')).toBeInTheDocument();
    expect(getByText('December 2, 2013')).toBeInTheDocument();
    expect(getByText('Episode:')).toBeInTheDocument();
    expect(getByText('S01E01')).toBeInTheDocument();
  });

});
