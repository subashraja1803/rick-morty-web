import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CharacterCard from '.';

jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));
describe('CharacterCard', () => {
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
    pageType: 'character',
  };
  
  test('renders CharacterCard component', () => {
    const { getByText, getByAltText } = render(
        <CharacterCard cardData={cardData} pageInfo={pageInfo} />
    );
  
    const characterName = getByText('Rick');
    expect(characterName).toBeInTheDocument();
  
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
  
    expect(navigate).toHaveBeenCalledWith('/character/1');
  });

  test('renders CharacterCard component', () => {
    const { getByText, getByAltText } = render(
        <CharacterCard
          cardData={{
            ...cardData, status: 'unknown',
          }}
          pageInfo={pageInfo}
        />
    );
  
    const characterName = getByText('Rick');
    expect(characterName).toBeInTheDocument();
  
    const characterImage = getByAltText('');
    expect(characterImage).toBeInTheDocument();
  });
  
})
