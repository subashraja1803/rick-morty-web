import React from 'react';
import _get from 'lodash/get';
import { connect } from 'react-redux';
import styles from './CharacterPage.module.scss';
import CharacterCard from '../Cards/CharacterCard';
import SearchBox from '../SearchBox';
import { getPageData } from '../../service';
import RickMortyActions from '../../store/RickMortyStore.actionhandlers';

function CharacterPage({
  cardData, setPageInfo, pageInfo, setSearchText, searchText,
  setCardData, setApiInfo, toggleLoader,
}) {
  const onCharacterSearch = () => {
    toggleLoader(true);
    getPageData({ ...pageInfo, pageNo: 1 }, searchText).then(({ info, results }) => {
      setCardData(results);
      setApiInfo(info);
    }).catch(() => {
      setCardData([]);
      setApiInfo({});
    }).finally(() => {
      toggleLoader(false);
      setPageInfo({ pageNo: 1 });
    });
  };
  const onSearchTextChange = ({ target: { value } }) => {
    setSearchText(value);
  };
  return (
    <div className={styles.characterPage}>
      <div className={styles.characterHeader}>Characters</div>
      <div className={styles.subHeader}>
        <SearchBox
          searchText={searchText}
          onChange={onSearchTextChange}
          onSearch={onCharacterSearch}
        />
      </div>
      <div className={styles.cardsSection}>
        {cardData.length > 0 ? cardData.map(data => (
          <CharacterCard
            pageInfo={pageInfo}
            characterData={data}
          />
        )) : (<span style={{ fontSize: '1.8rem', color: 'azure' }}>No Data Found</span>)}
      </div>

    </div>
  );
}

const mapStateToProps = ({ rickMortyStore }) => ({
  cardData: _get(rickMortyStore, 'cardData'),
  pageInfo: _get(rickMortyStore, 'pageInfo'),
  searchText: _get(rickMortyStore, 'searchText'),
});

const mapDispatchToProps = dispatch => ({
  setPageInfo: payload => dispatch(RickMortyActions.setPageInfo(payload)),
  setSearchText: payload => dispatch(RickMortyActions.setSearchText(payload)),
  setCardData: payload => dispatch(RickMortyActions.setCardData(payload)),
  setApiInfo: payload => dispatch(RickMortyActions.setApiInfo(payload)),
  toggleLoader: payload => dispatch(RickMortyActions.toggleLoader(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CharacterPage);
