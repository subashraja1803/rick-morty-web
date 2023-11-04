import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import { connect } from 'react-redux';
import { Select } from 'antd';
import styles from './Paginationfooter.module.scss';
import RickMortyActions from '../../store/RickMortyStore.actionhandlers';
import { getPageData } from '../../service';

function PaginationFooter({
  apiInfo, pageInfo, setApiInfo, setCardData, setPageInfo, searchText,
}) {
  const {
    prev, next, pages,
  } = apiInfo;
  const { pageNo } = pageInfo;
  const goToClickedPage = (page) => {
    getPageData({ ...pageInfo, pageNo: page }, searchText).then(({ info, results }) => {
      setPageInfo({ pageNo: page });
      setCardData(results);
      setApiInfo(info);
    }).catch(() => {
      setCardData([]);
      setApiInfo({});
    }).finally(() => {
    });
  };

  const pageOptions = useMemo(() => {
    const op = [];
    for (let i = 1; i <= pages; i += 1) {
      op.push({ label: i, value: i });
    }
    return op;
  }, [pages]);
  return (
    <div className={styles.paginationFooter}>
      <div
        className={prev ? styles.navigationText : styles.disabledText}
        onClick={() => goToClickedPage(pageNo - 1)}
        role="none"
      >Previous Page
      </div>
      <div className={styles.paginationBox}>
        <span>Page:</span>
        <Select
          options={pageOptions}
          value={pageNo}
          style={{ width: '4rem' }}
          onChange={goToClickedPage}
        />
      </div>
      <div
        className={next ? styles.navigationText : styles.disabledText}
        role="none"
        onClick={() => goToClickedPage(pageNo + 1)}
      >Next Page
      </div>
    </div>
  );
}

PaginationFooter.propTypes = {
  apiInfo: PropTypes.object.isRequired,
  pageInfo: PropTypes.object.isRequired,
  setApiInfo: PropTypes.func.isRequired,
  setCardData: PropTypes.func.isRequired,
  setPageInfo: PropTypes.func.isRequired,
  searchText: PropTypes.string.isRequired,
};

const mapStateToProps = ({ rickMortyStore }) => ({
  apiInfo: _get(rickMortyStore, 'apiInfo'),
  searchText: _get(rickMortyStore, 'searchText'),
  pageInfo: _get(rickMortyStore, 'pageInfo'),
});

const mapDispatchToProps = dispatch => ({
  setPageInfo: payload => dispatch(RickMortyActions.setPageInfo(payload)),
  setCardData: payload => dispatch(RickMortyActions.setCardData(payload)),
  setApiInfo: payload => dispatch(RickMortyActions.setApiInfo(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PaginationFooter);
