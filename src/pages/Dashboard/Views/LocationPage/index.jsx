import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import { connect } from 'react-redux';
import styles from './LocationPage.module.scss';
import LocationCard from '../../../../molecules/Cards/LocationCard';

function LocationPage({
  cardData, pageInfo,
}) {
  return (
    <div className={styles.locationPage}>
      <div className={styles.cardsSection}>
        {cardData.length > 0 ? cardData.map(data => (
          <LocationCard
            pageInfo={pageInfo}
            cardData={data}
          />
        )) : (<span style={{ fontSize: '1.8rem', color: 'azure' }}>No Data Found</span>)}
      </div>
    </div>
  );
}
LocationPage.propTypes = {
  cardData: PropTypes.array.isRequired,
  pageInfo: PropTypes.object.isRequired,
};

const mapStateToProps = ({ rickMortyStore }) => ({
  cardData: _get(rickMortyStore, 'cardData'),
  pageInfo: _get(rickMortyStore, 'pageInfo'),
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(LocationPage);
