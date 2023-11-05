import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import CharacterDetailPage from '.';
import { getPageData } from '../../../service';

jest.mock('../../../service', () => ({
  getPageData: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));

window.scrollTo = jest.fn();

const mockSingleData = {
  name: 'Rick',
  status: 'Alive',
  species: 'Human',
  gender: 'Male',
  type: 'Main character',
  origin: {
    name: 'Earth',
  },
  location: {
    name: 'Earth (Replacement Dimension)',
  },
  episode: [
    'https://rickandmortyapi.com/api/episode/1',
    'https://rickandmortyapi.com/api/episode/2',
  ]
};

const mockStore = configureStore([]);
const initialState = {
  rickMortyStore: {
    pageInfo: {
      pageType: 'character',
    },
    singleData: mockSingleData,
  },
};
const store = mockStore(initialState);

describe('CharacterDetailPage', () => {
  getPageData.mockResolvedValue(mockSingleData);
  it('renders the name correctly', () => {
    const { getByText } = render(
      <Provider store={store}>
        <CharacterDetailPage />
      </Provider>
    );

    expect(getByText('Rick')).toBeInTheDocument();
  });

  it('renders the status correctly', () => {
    const { getByText } = render(
      <Provider store={store}>
        <CharacterDetailPage />
      </Provider>
    );

    expect(getByText('Status:')).toBeInTheDocument();
    expect(getByText('Alive')).toBeInTheDocument();
  });

  it('renders the species correctly', () => {
    const { getByText } = render(
      <Provider store={store}>
        <CharacterDetailPage />
      </Provider>
    );

    expect(getByText('Species:')).toBeInTheDocument();
    expect(getByText('Human')).toBeInTheDocument();
  });

  it('renders the gender correctly', () => {
    const { getByText } = render(
      <Provider store={store}>
        <CharacterDetailPage />
      </Provider>
    );

    expect(getByText('Gender:')).toBeInTheDocument();
    expect(getByText('Male')).toBeInTheDocument();
  });

  it('renders the type correctly', () => {
    const { getByText } = render(
      <Provider store={store}>
        <CharacterDetailPage />
      </Provider>
    );

    expect(getByText('Type:')).toBeInTheDocument();
    expect(getByText('Main character')).toBeInTheDocument();
  });

  it('renders the origin location correctly', () => {
    const { getByText } = render(
      <Provider store={store}>
        <CharacterDetailPage />
      </Provider>
    );

    expect(getByText('Origin Location:')).toBeInTheDocument();
    expect(getByText('Earth')).toBeInTheDocument();
  });

  it('renders the last seen location correctly', () => {
    const { getByText } = render(
      <Provider store={store}>
        <CharacterDetailPage />
      </Provider>
    );

    expect(getByText('Last Seen Location:')).toBeInTheDocument();
    expect(getByText('Earth (Replacement Dimension)')).toBeInTheDocument();
  });

  it('navigates back when the Back button is clicked', () => {
    const navigate = jest.fn();
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(navigate);
    const { getByText } = render(
      <Provider store={store}>
        <CharacterDetailPage />
      </Provider>
    );

    const backButton = getByText('Back');
    fireEvent.click(backButton);
    expect(navigate).toHaveBeenCalledWith('/character');
  });

});
