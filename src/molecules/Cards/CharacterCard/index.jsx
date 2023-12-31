import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import styles from './CharacterCard.module.scss';
import { STATUS_COLOR } from '../../../constants/RickMortyConstants';

function CharacterCard({ cardData, pageInfo }) {
  const {
    status, species, origin, location, image, name, id,
  } = cardData;
  const navigate = useNavigate();
  return (
    <div className={styles.characterCard}>
      <div className={styles.imageSection}>
        <img
          src={image}
          alt=""
        />
      </div>
      <div className={styles.characterDetails}>
        <div className={styles.nameSection}>
          <span
            className={styles.name}
            onClick={() => navigate(`/${pageInfo.pageType}/${id}`)}
            role="none"
          >{name}
          </span>
          <div className={styles.status}>
            <div
              className={styles.statusIcon}
              style={STATUS_COLOR[status?.toLowerCase()] ? { backgroundColor: STATUS_COLOR[status?.toLowerCase()] } : {}}
            >
            </div>
            <span>{`${status} - ${species}`}</span>
          </div>
        </div>
        <div className={styles.location}>
          <span className={styles.locationHeader}>Last Known Location: </span>
          <span className={styles.locationDetail}>{location?.name}</span>
        </div>
        <div className={styles.location}>
          <span className={styles.locationHeader}>First Seen Location: </span>
          <span className={styles.locationDetail}>{origin?.name}</span>
        </div>
      </div>
    </div>
  );
}

CharacterCard.propTypes = {
  cardData: PropTypes.object.isRequired,
  pageInfo: PropTypes.object.isRequired,
};

export default CharacterCard;
