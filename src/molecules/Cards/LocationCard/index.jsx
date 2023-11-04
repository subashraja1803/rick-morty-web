import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import styles from './LocationCard.module.scss';

function LocationCard({
  cardData, pageInfo,
}) {
  const {
    name, residents, id, type, dimension,
  } = cardData;
  const navigate = useNavigate();
  return (
    <div className={styles.locationCard}>
      <div
        className={styles.name}
        onClick={() => navigate(`/${pageInfo?.pageType}/${id}`)}
        role="none"
      >{name}
      </div>
      <div className={styles.detail}>
        <span className={styles.header}>Type: </span>
        <span className={styles.value}>{type}</span>
      </div>
      <div className={styles.detail}>
        <span className={styles.header}>Dimension: </span>
        <span className={styles.value}>{dimension}</span>
      </div>
      <div className={styles.detail}>
        <span className={styles.header}>Number of Residents: </span>
        <span className={styles.value}>{residents?.length}</span>
      </div>
    </div>
  );
}

LocationCard.propTypes = {
  cardData: PropTypes.object.isRequired,
  pageInfo: PropTypes.object.isRequired,
};

export default LocationCard;
