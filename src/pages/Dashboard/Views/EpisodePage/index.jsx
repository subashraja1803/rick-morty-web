import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import { connect } from 'react-redux';
import styles from './EpisodePage.module.scss';
import EpisodeCard from '../../../../Molecules/Cards/EpisodeCard';

function EpisodePage({
  cardData, pageInfo,
}) {
  return (
    <div className={styles.episodePage}>
      <div className={styles.cardsSection}>
        {cardData.length > 0 ? cardData.map(data => (
          <EpisodeCard
            pageInfo={pageInfo}
            cardData={data}
          />
        )) : (<span style={{ fontSize: '1.8rem', color: 'azure' }}>No Data Found</span>)}
      </div>
    </div>
  );
}

EpisodePage.propTypes = {
  cardData: PropTypes.array.isRequired,
  pageInfo: PropTypes.object.isRequired,
};

const mapStateToProps = ({ rickMortyStore }) => ({
  cardData: _get(rickMortyStore, 'cardData'),
  pageInfo: _get(rickMortyStore, 'pageInfo'),
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(EpisodePage);
