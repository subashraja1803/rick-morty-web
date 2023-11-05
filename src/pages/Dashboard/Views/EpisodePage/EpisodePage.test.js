import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import EpisodePage from '.';

const mockStore = configureStore([]);

jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));

describe('Episode Page', () => {
  test('Renders the component with data', () => {
    const cardData = [
      { id: 1, name: 'Episode 1' },
      { id: 2, name: 'Episode 2' },
    ];
    const pageInfo = { pageType: 'episode' };
  
    const store = mockStore({
      rickMortyStore: {
        cardData,
        pageInfo,
      },
    });
  
    const { getByText } = render(
      <Provider store={store}>
        <EpisodePage />
      </Provider>
    );
  
    expect(getByText('Episode 1')).toBeInTheDocument();
    expect(getByText('Episode 2')).toBeInTheDocument();
  });
  
  test('Renders a message when there is no data', () => {
    const cardData = [];
    const pageInfo = { pageType: 'episode' };
  
    const store = mockStore({
      rickMortyStore: {
        cardData,
        pageInfo,
      },
    });
  
    const { getByText } = render(
      <Provider store={store}>
        <EpisodePage />
      </Provider>
    );
  
    expect(getByText('No Data Found')).toBeInTheDocument();
  });  
})

