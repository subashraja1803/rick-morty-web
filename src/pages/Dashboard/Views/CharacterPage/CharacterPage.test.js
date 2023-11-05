import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import CharacterPage from '.';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { getPageData } from '../../../../service';

jest.mock('../../../../service', () => ({
  getPageData: jest.fn(),
}));
jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));

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

const mockApiInfo = {
  prev: null,
  next: 2,
  pages: 40,
};

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

  test('select and apply filter location', () => {
    const storeValue = {
      rickMortyStore: {
        pageInfo: {
          filter: {
            name: 'location',
            value: 'earth',
          },
        },
        cardData: [
          {
            id: 1,
            name: 'Rick',
            location: { name: 'earth' }
          },
          {
            id: 2,
            name: 'Morty',
            location: { name: 'venus' }
          },
        ],
      },
    }
    const { getByText, getAllByRole } = render(
      <Provider store={mockStore(storeValue)}>
        <CharacterPage
          setPageInfo={setPageInfo}
          setCardData={setCardData}
          setApiInfo={setApiInfo}
          setSearchText={setSearchText}
        />
      </Provider>
    );

    const [filterType, filterValue] = getAllByRole('combobox');
    fireEvent.change(filterType, { target: { value: 'location' } });
    fireEvent.change(filterValue, { target: { value: 'earth' } });
    const applyFilterButton = getByText('Apply Filter');
    fireEvent.click(applyFilterButton);
    expect(getByText('Rick')).toBeInTheDocument();
  });
  test('select and apply filter episode', () => {
    const storeValue = {
      rickMortyStore: {
        pageInfo: {
          filter: {
            name: 'episode',
            value: 'wwww.rickandmortyapi.com/api/episode/1',
          },
        },
        cardData: [
          {
            id: 1,
            name: 'Rick',
            episode: ['wwww.rickandmortyapi.com/api/episode/1'],
          },
          {
            id: 2,
            name: 'Morty',
            episode: ['wwww.rickandmortyapi.com/api/episode/2'],
          },
        ],
      },
    }
    const { getByText, getAllByRole } = render(
      <Provider store={mockStore(storeValue)}>
        <CharacterPage
          setPageInfo={setPageInfo}
          setCardData={setCardData}
          setApiInfo={setApiInfo}
          setSearchText={setSearchText}
        />
      </Provider>
    );
  
    const [filterType, filterValue] = getAllByRole('combobox');
    fireEvent.change(filterType, { target: { value: 'episode' } });
    fireEvent.change(filterValue, { target: { value: 'wwww.rickandmortyapi.com/api/episode/1' } });
    const applyFilterButton = getByText('Apply Filter');
    fireEvent.click(applyFilterButton);
    expect(getByText('Rick')).toBeInTheDocument();
  });
  
  test('select and apply filter status', () => {
    getPageData.mockResolvedValue({ info: mockApiInfo, results: mockCardData });
    const mockCardData = [
      {
        id: 1,
        name: 'Rick',
        status: 'alive'
      },
      {
        id: 2,
        name: 'Morty',
        status: 'dead',
      },
    ];
    const storeValue = {
      rickMortyStore: {
        pageInfo: {
          apiInfo: mockApiInfo,
          filter: {
            name: 'status',
            value: 'alive',
          },
        },
        cardData: mockCardData,
      },
    }
    const { getByText, getAllByRole } = render(
      <Provider store={mockStore(storeValue)}>
        <CharacterPage
          setPageInfo={setPageInfo}
          setCardData={setCardData}
          setApiInfo={setApiInfo}
          setSearchText={setSearchText}
        />
      </Provider>
    );
  
    const [filterType, filterValue] = getAllByRole('combobox');
    fireEvent.change(filterType, { target: { value: 'status' } });
    fireEvent.change(filterValue, { target: { value: 'alive' } });
    const applyFilterButton = getByText('Apply Filter');
    fireEvent.click(applyFilterButton);
    expect(getByText('Rick')).toBeInTheDocument();
    getPageData.mockRejectedValue(new Error);
    const clearFilterButton = getByText('Clear Filter');
    fireEvent.click(clearFilterButton);
  });

  test('select and apply filter status rejected value', () => {
    const mockCardData = [
      {
        id: 1,
        name: 'Rick',
        status: 'alive'
      },
      {
        id: 2,
        name: 'Morty',
        status: 'dead',
      },
    ];
    const storeValue = {
      rickMortyStore: {
        pageInfo: {
          apiInfo: mockApiInfo,
          filter: {
            name: 'status',
            value: 'alive',
          },
        },
        cardData: mockCardData,
      },
    }
    const { getByText, getAllByRole } = render(
      <Provider store={mockStore(storeValue)}>
        <CharacterPage
          setPageInfo={setPageInfo}
          setCardData={setCardData}
          setApiInfo={setApiInfo}
          setSearchText={setSearchText}
        />
      </Provider>
    );
    getPageData.mockRejectedValue(new Error);
    const [filterType, filterValue] = getAllByRole('combobox');
    fireEvent.change(filterType, { target: { value: 'status' } });
    fireEvent.change(filterValue, { target: { value: 'alive' } });
    const applyFilterButton = getByText('Apply Filter');
    fireEvent.click(applyFilterButton);
    expect(getByText('Rick')).toBeInTheDocument();
    getPageData.mockResolvedValue({ info: mockApiInfo, results: mockCardData });
    const clearFilterButton = getByText('Clear Filter');
    fireEvent.click(clearFilterButton);
  });
});




