import React, { useMemo } from 'react';
import _get from 'lodash/get';
import { connect } from 'react-redux';
import { Select } from 'antd';
import styles from './Paginationfooter.module.scss';
import RickMortyActions from '../../store/RickMortyStore.actionhandlers';
import { getPageData } from '../../service';

function PaginationFooter({
  apiInfo, pageInfo, setApiInfo, setCardData, toggleLoader, setPageInfo,
}) {
  const {
    prev, next, pages,
  } = apiInfo;
  const { pageNo } = pageInfo;
  const goToClickedPage = (page) => {
    toggleLoader(true);
    getPageData({ ...pageInfo, pageNo: page }).then(({ info, results }) => {
      setPageInfo({ pageNo: page });
      setCardData(results);
      setApiInfo(info);
    }).catch(() => {
      setCardData([]);
      setApiInfo({});
    }).finally(() => {
      toggleLoader(false);
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
          style={{ width: '5rem' }}
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

const mapStateToProps = ({ rickMortyStore }) => ({
  apiInfo: _get(rickMortyStore, 'apiInfo'),
  pageInfo: _get(rickMortyStore, 'pageInfo'),
});

const mapDispatchToProps = dispatch => ({
  toggleLoader: payload => dispatch(RickMortyActions.toggleLoader(payload)),
  setPageInfo: payload => dispatch(RickMortyActions.setPageInfo(payload)),
  setCardData: payload => dispatch(RickMortyActions.setCardData(payload)),
  setApiInfo: payload => dispatch(RickMortyActions.setApiInfo(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PaginationFooter);
