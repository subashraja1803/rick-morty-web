import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';
import { connect } from 'react-redux';
import Loader from '../../Molecules/Loader';
import Dashboard from '../Dashboard';
import RickMortyActions from '../../store/RickMortyStore.actionhandlers';
import DetailPage from '../DetailPage';

function RouteSwitch({ showLoader }) {
  const { pathname } = window.location;
  useEffect(() => {
    if (pathname === '/') {
      window.location.replace('/character');
    }
  }, [pathname]);

  return (
    <>
      <Loader loading={showLoader} />
      <BrowserRouter>
        <Routes>
          <Route path="/character" element={<Dashboard />} />
          <Route path="/location" element={<Dashboard />} />
          <Route path="/episode" element={<Dashboard />} />
          <Route path="/character/:id" element={<DetailPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

RouteSwitch.propTypes = {
  showLoader: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ rickMortyStore }) => ({
  showLoader: _get(rickMortyStore, 'showLoader'),
});

const mapDispatchToProps = dispatch => ({
  toggleLoader: payload => dispatch(RickMortyActions.toggleLoader(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RouteSwitch);
