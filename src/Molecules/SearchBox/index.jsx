import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import styles from './SearchBox.module.scss';

const { Search } = Input;

function SearchBox({
  onSearch, searchText, onChange,
}) {
  return (
    <div className={styles.searchBoxContainer}>
      <Search
        placeholder="Input Search Text"
        size="large"
        enterButton="Search"
        value={searchText}
        onChange={onChange}
        onSearch={onSearch}
        className={styles.searchBox}
      />
    </div>
  );
}

SearchBox.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  searchText: PropTypes.string,
};

SearchBox.defaultProps = {
  searchText: '',
};

export default SearchBox;
