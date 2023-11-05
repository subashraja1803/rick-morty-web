import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import EpisodeCard from '.';

jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));

describe('EpisodeCard', () => {
  const cardData = {
    name: 'Pilot',
    id: 1,
    air_date: 'Mar 18 2001',
    episode: 'S01E01',
    characters: ['Character1', 'Character2'],
  };

  const pageInfo = {
    pageType: 'episode',
  };

  test('renders the episode name', () => {
    const { getByText } = render(
      <EpisodeCard cardData={cardData} pageInfo={pageInfo} />
    );
    const episodeName = getByText('Pilot');
    expect(episodeName).toBeInTheDocument();
  });

  test('handles click event on episode name', () => {
    const navigate = jest.fn();
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(navigate);

    const { getByText } = render(
      <EpisodeCard cardData={cardData} pageInfo={pageInfo} />
    );

    const episodeName = getByText('Pilot');
    fireEvent.click(episodeName);

    expect(navigate).toHaveBeenCalled();
  });
});
