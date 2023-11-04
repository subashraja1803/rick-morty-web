import React, { useEffect, useState } from 'react';
import _get from 'lodash/get';
import PropTypes from 'prop-types';
import { BackwardOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './LocationDetailPage.module.scss';
import { getPageData } from '../../../service';
import RickMortyActions from '../../../store/RickMortyStore.actionhandlers';

function LocationDetailPage({
  pageInfo, setSingleData, singleData,
}) {
  const { pageType } = pageInfo;
  const {
    name, residents, dimension, type,
  } = singleData;
  const [charactersDetail, setCharactersDetail] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (residents?.length) {
      const allEpIds = [];
      residents.forEach((ep) => {
        allEpIds.push(ep.split('/').pop());
      });
      getPageData({ pageType: 'character' }, '', allEpIds).then((result) => {
        if (result.length) setCharactersDetail(result);
        else charactersDetail([result]);
      });
    }
  }, [residents]);
  useEffect(() => {
    window.scrollTo(0, 0);
    return () => setSingleData({});
  }, []);
  const id = window.location.pathname.split('/').pop();
  useEffect(() => {
    getPageData({ pageType }, '', id).then((data) => {
      setSingleData(data);
    });
  }, [id, pageType]);
  return (
    <div className={styles.detailPage}>
      <div className={styles.backButton}>
        <Button type="dashed" onClick={() => navigate(`/${pageType}`)}>
          <BackwardOutlined />
          <span>Back</span>
        </Button>
      </div>
      <div className={styles.titleSection}>
        <span>{name}</span>
      </div>
      <div className={styles.locationDetails}>
        <div className={styles.details}>
          <p>Type: </p>
          <span>{type || 'Unknown'}</span>
          <p>Dimension: </p>
          <span>{dimension || 'Unknown'}</span>
        </div>
        <div className={styles.episodesSection}>
          <h1>Residents List: </h1>
          {
            (charactersDetail || []).map(({ name: epName, id: epId }, index) => (
              <span key={epId}>{index + 1}. {epName}</span>
            ))
          }
        </div>
      </div>
    </div>
  );
}

LocationDetailPage.propTypes = {
  pageInfo: PropTypes.object.isRequired,
  setSingleData: PropTypes.func.isRequired,
  singleData: PropTypes.object.isRequired,
};

const mapStateToProps = ({ rickMortyStore }) => ({
  pageInfo: _get(rickMortyStore, 'pageInfo'),
  singleData: _get(rickMortyStore, 'singleData'),
});

const mapDispatchtoProps = dispatch => ({
  setSingleData: payload => dispatch(RickMortyActions.setSingleData(payload)),
});

export default connect(mapStateToProps, mapDispatchtoProps)(LocationDetailPage);
