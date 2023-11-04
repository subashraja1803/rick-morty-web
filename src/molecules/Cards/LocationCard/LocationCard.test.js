import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import LocationCard from '.';

jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));
describe('LocationCard', () => {
  const cardData = {
    name: 'Earth',
    residents: ['Resident1', 'Resident2'],
    id: 1,
    type: 'Type',
    dimension: 'Dimension',
  };

  const pageInfo = {
    pageType: 'location',
  };

  test('renders LocationCard component', () => {
    const { getByText } = render(
      <LocationCard cardData={cardData} pageInfo={pageInfo} />
    );

    const locationName = getByText('Earth');
    expect(locationName).toBeInTheDocument();
  });

  test('handles click event on location name', () => {
    const navigate = jest.fn();
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(navigate);

    const { getByText } = render(
      <LocationCard cardData={cardData} pageInfo={pageInfo} />
    );

    const locationName = getByText('Earth');
    fireEvent.click(locationName);

    expect(navigate).toHaveBeenCalledWith('/location/1');
  });
});
