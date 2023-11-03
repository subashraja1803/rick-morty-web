import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './DashBoard.module.scss';
import { getPageData } from '../../service';
import RickMortyActions from '../../store/RickMortyStore.actionhandlers';
import { PAGE_TYPES } from '../../constants/RickMortyConstants';
import PaginationFooter from '../../molecules/PaginationFooter';
import SearchBox from '../../molecules/SearchBox';

function Dashboard({
  pageInfo, setCardData, setApiInfo, setPageInfo, setSearchText, searchText,
  toggleLoader,
}) {
  const { pageType } = pageInfo;
  const navigate = useNavigate();
  useEffect(() => {
    getPageData({ pageType }).then((response) => {
      const { info, results } = response;
      setApiInfo(info);
      setCardData(results);
    }).catch(() => {
      setCardData([]);
      setApiInfo({});
    });
  }, [pageInfo?.pageType]);
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
  const restPageTypes = Object.keys(PAGE_TYPES).filter(page => page !== pageType);
  const RenderComponent = PAGE_TYPES[pageType]?.renderComponent;
  return (
    <div className={styles.dashboard}>
      <div className={styles.titleSection}>
        <span className={styles.titleText}>
          Rick and Morty
        </span>
      </div>
      <div className={styles.navLinkSection}>
        {restPageTypes.map(type => (
          <div
            key={type}
            className={styles.navLinkItem}
            onClick={() => { navigate(`/${type}`); setPageInfo({ pageType: type }); }}
            role="button"
            tabIndex={0}
          >{PAGE_TYPES[type]?.label}
          </div>
        ))}
      </div>
      <div className={styles.mainContent}>
        <div className={styles.characterHeader}>Characters</div>
        <div className={styles.subHeader}>
          <SearchBox
            searchText={searchText}
            onChange={onSearchTextChange}
            onSearch={onCharacterSearch}
          />
        </div>
        <RenderComponent />
        <PaginationFooter />
      </div>
    </div>
  );
}

Dashboard.propTypes = {
  pageInfo: PropTypes.object.isRequired,
  setCardData: PropTypes.func.isRequired,
  setApiInfo: PropTypes.func.isRequired,
  setPageInfo: PropTypes.func.isRequired,
  setSearchText: PropTypes.func.isRequired,
  searchText: PropTypes.string.isRequired,
  toggleLoader: PropTypes.func.isRequired,
};

const mapStateToProps = ({ rickMortyStore }) => ({
  pageInfo: _get(rickMortyStore, 'pageInfo'),
  searchText: _get(rickMortyStore, 'searchText'),
});

const mapDispatchToProps = dispatch => ({
  setApiInfo: payload => dispatch(RickMortyActions.setApiInfo(payload)),
  setPageInfo: payload => dispatch(RickMortyActions.setPageInfo(payload)),
  setCardData: payload => dispatch(RickMortyActions.setCardData(payload)),
  setSearchText: payload => dispatch(RickMortyActions.setSearchText(payload)),
  toggleLoader: payload => dispatch(RickMortyActions.toggleLoader(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
