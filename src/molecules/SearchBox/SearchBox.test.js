import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SearchBox from '.';

describe('SearchBox Component', () => {
  test('renders SearchBox component', () => {
    const { getByPlaceholderText } = render(
      <SearchBox onSearch={() => {}} onChange={() => {}} />
    );

    const searchInput = getByPlaceholderText('Input Search Text');
    expect(searchInput).toBeInTheDocument();
  });

  test('triggers onChange callback on input change', () => {
    const onChangeMock = jest.fn();
    const { getByPlaceholderText } = render(
      <SearchBox onSearch={() => {}} onChange={onChangeMock} />
    );

    const searchInput = getByPlaceholderText('Input Search Text');
    fireEvent.change(searchInput, { target: { value: 'Test Text' } });

    expect(onChangeMock).toHaveBeenCalled();
  });

  test('triggers onSearch callback on search button click', () => {
    const onSearchMock = jest.fn();
    const { getByText } = render(
      <SearchBox onSearch={onSearchMock} onChange={() => {}} />
    );

    const searchButton = getByText('Search');
    fireEvent.click(searchButton);

    expect(onSearchMock).toHaveBeenCalled();
  });
});
