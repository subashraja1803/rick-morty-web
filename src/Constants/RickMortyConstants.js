import CharacterPage from '../Molecules/CharacterPage';

export const PAGE_TYPES = {
  character: { key: 'character', label: 'Character', renderComponent: CharacterPage },
  location: { key: 'location', label: 'Location', renderComponent: CharacterPage },
  episode: { key: 'episode', label: 'Episode', renderComponent: CharacterPage },
};

export const STATUS_COLOR = {
  alive: 'rgb(85, 204, 68)',
  dead: 'rgb(214, 61, 46)',
};
