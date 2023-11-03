import React, { useEffect, useState } from 'react';
import _get from 'lodash/get';
import PropTypes from 'prop-types';
import { BackwardOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './CharacterDetailPage.module.scss';
import { getPageData } from '../../../service';
import RickMortyActions from '../../../store/RickMortyStore.actionhandlers';
import { STATUS_COLOR } from '../../../constants/RickMortyConstants';

function CharacterDetailPage({
  pageInfo, setSingleData, singleData,
}) {
  const { pageType } = pageInfo;
  const {
    name, image, episode, status, species, gender, type, origin, location,
  } = singleData;
  const [episodesDetail, setEpisodesDetail] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (episode?.length) {
      const allEpIds = [];
      episode.forEach((ep) => {
        allEpIds.push(ep.split('/').pop());
      });
      getPageData({ pageType: 'episode' }, '', allEpIds).then((result) => {
        if (result.length) setEpisodesDetail(result);
        else setEpisodesDetail([result]);
      });
    }
  }, [episode]);
  const id = window.location.pathname.split('/').pop();
  useEffect(() => {
    getPageData({ pageType }, '', id).then((data) => {
      setSingleData(data);
    });
  }, [id]);
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
        <img
          src={image}
          alt=""
        />
      </div>
      <div className={styles.characterDetails}>
        <div className={styles.details}>
          <p>Status: </p>
          <span className={styles.status}>
            <div
              className={styles.statusIcon}
              style={STATUS_COLOR[status?.toLowerCase()] ? { backgroundColor: STATUS_COLOR[status?.toLowerCase()] } : {}}
            >
            </div>{status}
          </span>
          <p>Species: </p>
          <span>{species || 'Unknown'}</span>
          <p>Gender: </p>
          <span>{gender || 'Unknown'}</span>
          <p>Type: </p>
          <span>{type || 'Unknown'}</span>
          <p>Origin Location: </p>
          <span>{origin?.name}</span>
          <p>Last Seen Location: </p>
          <span>{location?.name}</span>
        </div>
        <div className={styles.episodesSection}>
          <h1>Episodes List:</h1>
          {
            (episodesDetail || []).map(({ name: epName, id: epId }, index) => (
              <span key={epId}>{index + 1}. {epName}</span>
            ))
          }
        </div>
      </div>
    </div>
  );
}

CharacterDetailPage.propTypes = {
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

export default connect(mapStateToProps, mapDispatchtoProps)(CharacterDetailPage);
