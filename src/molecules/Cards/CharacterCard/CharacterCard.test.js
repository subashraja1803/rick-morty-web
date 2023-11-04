import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CharacterCard from '.';
import { Provider } from 'react-redux';

// Mock the useNavigate function
jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));

const cardData = {
  status: 'Alive',
  species: 'Human',
  origin: { name: 'Earth' },
  location: { name: 'Somewhere' },
  image: 'character-image-url',
  name: 'Rick',
  id: 1,
};

const pageInfo = {
  pageType: 'characters',
};

test('renders CharacterCard component', () => {
  const { getByText, getByAltText } = render(
    <Provider>    
      <CharacterCard cardData={cardData} pageInfo={pageInfo} />
    </Provider>

  );

  // Check if the character's name is displayed
  const characterName = getByText('Rick');
  expect(characterName).toBeInTheDocument();

  // Check if the character's image is displayed
  const characterImage = getByAltText('');
  expect(characterImage).toBeInTheDocument();
});

test('handles click event on character name', () => {
  const navigate = jest.fn();
  jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(navigate);

  const { getByText } = render(
    <CharacterCard cardData={cardData} pageInfo={pageInfo} />
  );

  const characterName = getByText('Rick');
  fireEvent.click(characterName);

  // Ensure that the navigate function was called with the expected URL
  expect(navigate).toHaveBeenCalledWith('/characters/1');
});
