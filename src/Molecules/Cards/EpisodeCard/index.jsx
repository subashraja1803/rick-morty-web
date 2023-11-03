import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import styles from './EpisodeCard.module.scss';

function EpisodeCard({
  cardData, pageInfo,
}) {
  const {
    name, id, air_date, episode, characters,
  } = cardData;
  const navigate = useNavigate();
  return (
    <div className={styles.episodeCard}>
      <div
        className={styles.name}
        onClick={() => navigate(`/${pageInfo?.pageType}/${id}`)}
        role="none"
      >{name}
      </div>
      <div className={styles.detail}>
        <span className={styles.header}>Air Date: </span>
        <span className={styles.value}>{air_date}</span>
      </div>
      <div className={styles.detail}>
        <span className={styles.header}>Episode: </span>
        <span className={styles.value}>{episode}</span>
      </div>
      <div className={styles.detail}>
        <span className={styles.header}>Number of Characters: </span>
        <span className={styles.value}>{characters?.length}</span>
      </div>
    </div>
  );
}

EpisodeCard.propTypes = {
  cardData: PropTypes.array.isRequired,
  pageInfo: PropTypes.object.isRequired,
};

export default EpisodeCard;
