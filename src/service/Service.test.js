import axios from 'axios';
import * as service from '.';

jest.mock('axios');

describe('service functions', () => {
  it('getPageData should fetch data and return it', async () => {
    axios.get.mockResolvedValue({ data: 'mockedData' });
    const pageInfo = {
      pageType: 'character',
    };
    const searchText = 'search';
    const id = '1';

    const result = await service.getPageData(pageInfo, searchText, id);

    expect(result).toBe('mockedData');
    expect(axios.get).toHaveBeenCalledWith('https://rickandmortyapi.com/api/character/1');
  });

  it('getPageData should handle errors', async () => {
    axios.get.mockRejectedValue(new Error('API Error'));
    const pageInfo = {};
    const searchText = 'search';
    const id = '123';

    const result = await service.getPageData(pageInfo, searchText, id);

    expect(result).toBeUndefined();
  });
});
