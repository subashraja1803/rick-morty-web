import React from 'react';
import styles from './Loader.module.scss';

function Loader({ loading = false }) {
  if (loading) {
    return (
      <div className={styles.Loader}>Loading...</div>
    );
  }
  return null;
}

export default Loader;
