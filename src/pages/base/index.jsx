import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';
import { connect } from 'react-redux';
import Loader from '../../molecules/Loader';
import Dashboard from '../Dashboard';
import RickMortyActions from '../../store/RickMortyStore.actionhandlers';
import CharacterDetailPage from '../DetailPage/CharacterDetailPage';

function RouteSwitch({ showLoader, setPageInfo }) {
  const { pathname } = window.location;
  useEffect(() => {
    if (pathname === '/') {
      window.location.replace('/character');
    }
  }, [pathname]);

  useEffect(() => {
    if (['character', 'location', 'episode'].includes(pathname.replace('/', ''))) {
      setPageInfo({ pageType: pathname.replace('/', '') });
    }
  }, []);

  return (
    <>
      <Loader loading={showLoader} />
      <BrowserRouter>
        <Routes>
          <Route path="/character" element={<Dashboard />} />
          <Route path="/location" element={<Dashboard />} />
          <Route path="/episode" element={<Dashboard />} />
          <Route path="/character/:id" element={<CharacterDetailPage />} />
          <Route path="/location/:id" element={<CharacterDetailPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

RouteSwitch.propTypes = {
  showLoader: PropTypes.bool.isRequired,
  setPageInfo: PropTypes.func.isRequired,
};

const mapStateToProps = ({ rickMortyStore }) => ({
  showLoader: _get(rickMortyStore, 'showLoader'),
});

const mapDispatchToProps = dispatch => ({
  toggleLoader: payload => dispatch(RickMortyActions.toggleLoader(payload)),
  setPageInfo: payload => dispatch(RickMortyActions.setPageInfo(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RouteSwitch);
