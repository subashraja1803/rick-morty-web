import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './DashBoard.module.scss';
import { getPageData } from '../../service';
import RickMortyActions from '../../store/RickMortyStore.actionhandlers';
import { PAGE_TYPES } from '../../Constants/RickMortyConstants';
import PaginationFooter from '../../Molecules/PaginationFooter';

function Dashboard({
  pageInfo, setCardData, setApiInfo, setPageInfo,
}) {
  const { pageType } = pageInfo;
  const navigate = useNavigate();
  useEffect(() => {
    getPageData(pageInfo).then((response) => {
      const { info, results } = response;
      setApiInfo(info);
      setCardData(results);
    }).catch(() => {
      setCardData([]);
      setApiInfo({});
    });
  }, [pageInfo?.pageType]);
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
            className={styles.navLinkItem}
            onClick={() => { navigate(`/${type}`); setPageInfo({ pageType: type }); }}
            role="button"
            tabIndex={0}
          >{PAGE_TYPES[type]?.label}
          </div>
        ))}
      </div>
      <div className={styles.mainContent}>
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
};

const mapStateToProps = ({ rickMortyStore }) => ({
  pageInfo: _get(rickMortyStore, 'pageInfo'),
});

const mapDispatchToProps = dispatch => ({
  setApiInfo: payload => dispatch(RickMortyActions.setApiInfo(payload)),
  setPageInfo: payload => dispatch(RickMortyActions.setPageInfo(payload)),
  setCardData: payload => dispatch(RickMortyActions.setCardData(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
