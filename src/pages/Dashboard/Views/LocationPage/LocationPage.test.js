import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import LocationPage from '.';

const mockStore = configureStore([]);

jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));

describe('Location Page', () => {
  test('Renders the component with data', () => {
    const cardData = [
      { id: 1, name: 'Location 1' },
      { id: 2, name: 'Location 2' },
    ];
    const pageInfo = { pageType: 'location' };
  
    const store = mockStore({
      rickMortyStore: {
        cardData,
        pageInfo,
      },
    });
  
    const { getByText } = render(
      <Provider store={store}>
        <LocationPage />
      </Provider>
    );
  
    expect(getByText('Location 1')).toBeInTheDocument();
    expect(getByText('Location 2')).toBeInTheDocument();
  });
  
  test('Renders a message when there is no data', () => {
    const cardData = [];
    const pageInfo = { pageType: 'location' };
  
    const store = mockStore({
      rickMortyStore: {
        cardData,
        pageInfo,
      },
    });
  
    const { getByText } = render(
      <Provider store={store}>
        <LocationPage />
      </Provider>
    );
  
    expect(getByText('No Data Found')).toBeInTheDocument();
  });  
})

