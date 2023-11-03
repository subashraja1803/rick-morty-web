import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import { connect } from 'react-redux';
import { Button, Select } from 'antd';
import styles from './CharacterPage.module.scss';
import CharacterCard from '../../../../molecules2/Cards/CharacterCard';
import RickMortyActions from '../../../../store/RickMortyStore.actionhandlers';
import { getPageData } from '../../../../service';
import { CHARACTER_FILTER_TYPES, filterValueOptions } from '../../../../constants2/RickMortyConstants';

function CharacterPage({
  cardData, pageInfo, setPageInfo, setCardData, setApiInfo, setSearchText,
}) {
  const { filter } = pageInfo;
  const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
    setFilteredData([...cardData]);
  }, [cardData]);
  const onApplyFilter = () => {
    const { name, value } = filter;
    if (name === 'location') {
      setFilteredData(cardData.filter(({ location }) => location?.name === value));
    } else if (name === 'episode') {
      setFilteredData(cardData.filter(({ episode }) => episode.includes(value)));
    } else {
      getPageData({ ...pageInfo, pageNo: 1 }).then(({ info, results }) => {
        setCardData(results);
        setApiInfo(info);
      }).catch(() => {
        setCardData([]);
        setApiInfo({});
      }).finally(() => {
        setPageInfo({ pageNo: 1 });
        setSearchText('');
      });
    }
  };
  const onFilterTypeChange = (val) => {
    setPageInfo({
      filter: { ...filter, name: val },
    });
  };

  const onFilterValueChange = (val) => {
    setPageInfo({
      filter: { ...filter, value: val },
    });
  };
  return (
    <div className={styles.characterPage}>
      <div className={styles.filterSection}>
        <div className={styles.filterType}>
          <Select
            placeholder="Choose Filter Type"
            className={styles.filterTypeBox}
            onChange={onFilterTypeChange}
            value={filter?.name}
            options={CHARACTER_FILTER_TYPES}
          />
        </div>
        <div className={styles.filterValue}>
          <Select
            placeholder="Choose Filter Value"
            className={styles.filterValueBox}
            onChange={onFilterValueChange}
            value={filter?.value}
            options={filter?.name ? filterValueOptions[filter?.name] : [{ label: 'Choose Filter Type', value: 'Choose Filter Type', disabled: true }]}
          />
        </div>
        <Button
          className={styles.applyFilterButton}
          type="primary"
          onClick={onApplyFilter}
        >
          Apply Filter
        </Button>
      </div>
      <div className={styles.cardsSection}>
        {filteredData.length > 0 ? filteredData.map(data => (
          <CharacterCard
            pageInfo={pageInfo}
            cardData={data}
          />
        )) : (<span style={{ fontSize: '1.8rem', color: 'azure' }}>No Data Found</span>)}
      </div>

    </div>
  );
}

CharacterPage.propTypes = {
  cardData: PropTypes.array.isRequired,
  pageInfo: PropTypes.object.isRequired,
  setPageInfo: PropTypes.func.isRequired,
  setCardData: PropTypes.func.isRequired,
  setApiInfo: PropTypes.func.isRequired,
  setSearchText: PropTypes.func.isRequired,
};

const mapStateToProps = ({ rickMortyStore }) => ({
  cardData: _get(rickMortyStore, 'cardData'),
  pageInfo: _get(rickMortyStore, 'pageInfo'),
  searchText: _get(rickMortyStore, 'searchText'),
});

const mapDispatchToProps = dispatch => ({
  setPageInfo: payload => dispatch(RickMortyActions.setPageInfo(payload)),
  setCardData: payload => dispatch(RickMortyActions.setCardData(payload)),
  setSearchText: payload => dispatch(RickMortyActions.setSearchText(payload)),
  setApiInfo: payload => dispatch(RickMortyActions.setApiInfo(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CharacterPage);
