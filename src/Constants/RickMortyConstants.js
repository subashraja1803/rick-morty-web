import CharacterPage from '../pages/Dashboard/Views/CharacterPage';
import EpisodePage from '../pages/Dashboard/Views/EpisodePage';
import LocationPage from '../pages/Dashboard/Views/LocationPage';

export const PAGE_TYPES = {
  character: { key: 'character', label: 'Characters', renderComponent: CharacterPage },
  location: { key: 'location', label: 'Locations', renderComponent: LocationPage },
  episode: { key: 'episode', label: 'Episodes', renderComponent: EpisodePage },
};

export const STATUS_COLOR = {
  alive: 'rgb(85, 204, 68)',
  dead: 'rgb(214, 61, 46)',
};

export const CHARACTER_FILTER_TYPES = [
  { value: 'status', label: 'Status' },
  { value: 'gender', label: 'Gender' },
  { value: 'episode', label: 'Episode' },
  { value: 'location', label: 'Location' },
  { value: 'species', label: 'Species' },
];

export const filterValueOptions = {
  location: [
    {
      label: 'Earth (C-137)',
      value: 'Earth (C-137)',
    },
    {
      label: 'Abadango',
      value: 'Abadango',
    },
    {
      label: 'Citadel of Ricks',
      value: 'Citadel of Ricks',
    },
    {
      label: "Worldender's lair",
      value: "Worldender's lair",
    },
    {
      label: 'Anatomy Park',
      value: 'Anatomy Park',
    },
    {
      label: 'Interdimensional Cable',
      value: 'Interdimensional Cable',
    },
    {
      label: 'Immortality Field Resort',
      value: 'Immortality Field Resort',
    },
    {
      label: 'Post-Apocalyptic Earth',
      value: 'Post-Apocalyptic Earth',
    },
    {
      label: 'Purge Planet',
      value: 'Purge Planet',
    },
    {
      label: 'Venzenulon 7',
      value: 'Venzenulon 7',
    },
    {
      label: 'Bepis 9',
      value: 'Bepis 9',
    },
    {
      label: 'Cronenberg Earth',
      value: 'Cronenberg Earth',
    },
    {
      label: 'Nuptia 4',
      value: 'Nuptia 4',
    },
    {
      label: "Giant's Town",
      value: "Giant's Town",
    },
    {
      label: 'Bird World',
      value: 'Bird World',
    },
    {
      label: 'St. Gloopy Noops Hospital',
      value: 'St. Gloopy Noops Hospital',
    },
    {
      label: 'Earth (5-126)',
      value: 'Earth (5-126)',
    },
    {
      label: "Mr. Goldenfold's dream",
      value: "Mr. Goldenfold's dream",
    },
    {
      label: 'Gromflom Prime',
      value: 'Gromflom Prime',
    },
    {
      label: 'Earth (Replacement Dimension)',
      value: 'Earth (Replacement Dimension)',
    },
    {
      label: 'unknown',
      value: 'Unknown',
    },
  ],
  episode: [
    {
      label: 'Pilot',
      value: 'https://rickandmortyapi.com/api/episode/1',
    },
    {
      label: 'Lawnmower Dog',
      value: 'https://rickandmortyapi.com/api/episode/2',
    },
    {
      label: 'Anatomy Park',
      value: 'https://rickandmortyapi.com/api/episode/3',
    },
    {
      label: 'M. Night Shaym-Aliens!',
      value: 'https://rickandmortyapi.com/api/episode/4',
    },
    {
      label: 'Meeseeks and Destroy',
      value: 'https://rickandmortyapi.com/api/episode/5',
    },
    {
      label: 'Rick Potion #9',
      value: 'https://rickandmortyapi.com/api/episode/6',
    },
    {
      label: 'Raising Gazorpazorp',
      value: 'https://rickandmortyapi.com/api/episode/7',
    },
    {
      label: 'Rixty Minutes',
      value: 'https://rickandmortyapi.com/api/episode/8',
    },
    {
      label: 'Something Ricked This Way Comes',
      value: 'https://rickandmortyapi.com/api/episode/9',
    },
    {
      label: 'Close Rick-counters of the Rick Kind',
      value: 'https://rickandmortyapi.com/api/episode/10',
    },
    {
      label: 'Ricksy Business',
      value: 'https://rickandmortyapi.com/api/episode/11',
    },
    {
      label: 'A Rickle in Time',
      value: 'https://rickandmortyapi.com/api/episode/12',
    },
    {
      label: 'Mortynight Run',
      value: 'https://rickandmortyapi.com/api/episode/13',
    },
    {
      label: 'Auto Erotic Assimilation',
      value: 'https://rickandmortyapi.com/api/episode/14',
    },
    {
      label: 'Total Rickall',
      value: 'https://rickandmortyapi.com/api/episode/15',
    },
    {
      label: 'Get Schwifty',
      value: 'https://rickandmortyapi.com/api/episode/16',
    },
    {
      label: 'The Ricks Must Be Crazy',
      value: 'https://rickandmortyapi.com/api/episode/17',
    },
    {
      label: 'Big Trouble in Little Sanchez',
      value: 'https://rickandmortyapi.com/api/episode/18',
    },
    {
      label: 'Interdimensional Cable 2: Tempting Fate',
      value: 'https://rickandmortyapi.com/api/episode/19',
    },
    {
      label: "Look Who's Purging Now",
      value: 'https://rickandmortyapi.com/api/episode/20',
    },
  ],
  status: [
    { value: 'alive', label: 'Alive' },
    { value: 'dead', label: 'Dead' },
    { value: 'unknown', label: 'Unknown' },
  ],
  gender: [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'unknown', label: 'Unknown' },
  ],
  species: [
    { value: 'human', label: 'Human' },
    { value: 'alien', label: 'Alien' },
    { value: 'humanoid', label: 'Humanoid' },
    { value: 'poopybutthole', label: 'PoopyButtHole' },
    { value: 'animal', label: 'Animal' },
    { value: 'mythological creature', label: 'Mythological Creature' },
    { value: 'robot', label: 'Robot' },
    { value: 'cronenberg', label: 'CronenBerg' },
    { value: 'disease', label: 'Disease' },
  ],
};
