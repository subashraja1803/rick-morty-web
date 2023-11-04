import React, { useEffect, useState } from 'react';
import _get from 'lodash/get';
import PropTypes from 'prop-types';
import { BackwardOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './EpisodeDetailPage.module.scss';
import { getPageData } from '../../../service';
import RickMortyActions from '../../../store/RickMortyStore.actionhandlers';

function EpisodeDetailPage({
  pageInfo, setSingleData, singleData,
}) {
  const { pageType } = pageInfo;
  const {
    name, characters, air_date, episode,
  } = singleData;
  const [charactersDetail, setCharactersDetail] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (characters?.length) {
      const allEpIds = [];
      characters.forEach((ep) => {
        allEpIds.push(ep.split('/').pop());
      });
      getPageData({ pageType: 'character' }, '', allEpIds).then((result) => {
        if (result.length) setCharactersDetail(result);
        else charactersDetail([result]);
      });
    }
  }, [characters]);
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
          <p>Air Date: </p>
          <span>{air_date || 'Unknown'}</span>
          <p>Episode: </p>
          <span>{episode || 'Unknown'}</span>
        </div>
        <div className={styles.episodesSection}>
          <h1>Characters List: </h1>
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

EpisodeDetailPage.propTypes = {
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

export default connect(mapStateToProps, mapDispatchtoProps)(EpisodeDetailPage);
