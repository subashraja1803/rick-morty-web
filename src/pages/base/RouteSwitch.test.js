import React from 'react';
import PropTypes from 'prop-types';
import { render, screen, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import RouteSwitch from '.';

const mockStore = configureStore([]);

describe('RouteSwitch component', () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      rickMortyStore: {
        apiInfo: {
          prev: null,
          next: 2,
          pages: 3
        },
        pageInfo: {
          pageType: 'character',
          filter: {},
          pageNo: 1
        },
        searchText: '',
        cardData: [],
        singleData: {
          id: 1,
          name: 'Rick'
        },
      },
    });
  });

  it('should render Dashboard component for /character route', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/character']}>
          <RouteSwitch />
        </MemoryRouter>
      </Provider>
    );

    // Add your assertions here, e.g., check if the Dashboard component is rendered
    // You can use screen queries from testing-library/react to check for elements.
    const dashboardElement = screen.getByText('Rick and Morty'); // Adjust to your actual text

    expect(dashboardElement).toBeInTheDocument();
  });

  it('should render CharacterDetailPage component for /character/:id route', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/character/1']}>
          <RouteSwitch />
        </MemoryRouter>
      </Provider>
    );
  });

});
