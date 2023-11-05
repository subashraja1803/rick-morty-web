import { constructURL } from './Utils';

describe('constructURL function', () => {
  it('should construct a URL with page type and page number', () => {
    const pageInfo = {
      pageType: 'character',
      pageNo: 2,
    };
    const searchText = 'Rick';
    const id = null;

    const result = constructURL(pageInfo, searchText, id);

    expect(result).toBe('/character?page=2&name=Rick');
  });

  it('should construct a URL with page type and filter', () => {
    const pageInfo = {
      pageType: 'location',
      filter: {
        name: 'type',
        value: 'Planet',
      },
    };
    const searchText = null;
    const id = null;

    const result = constructURL(pageInfo, searchText, id);

    expect(result).toBe('/location?type=Planet');
  });

  it('should construct a URL with page type and ID', () => {
    const pageInfo = {
      pageType: 'episode',
    };
    const searchText = null;
    const id = 123;

    const result = constructURL(pageInfo, searchText, id);

    expect(result).toBe('/episode/123');
  });

  it('should construct a URL without additional parameters', () => {
    const pageInfo = {
      pageType: 'character',
    };
    const searchText = null;
    const id = null;

    const result = constructURL(pageInfo, searchText, id);

    expect(result).toBe('/character');
  });

  it('should handle null pageInfo', () => {
    const pageInfo = null;
    const searchText = 'Morty';
    const id = null;

    const result = constructURL(pageInfo, searchText, id);

    expect(result).toBe('/undefined?name=Morty');
  });
});
