import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import {
  Routes, Route, useNavigate,
} from 'react-router-dom';
import { connect } from 'react-redux';
import Dashboard from '../Dashboard';
import RickMortyActions from '../../store/RickMortyStore.actionhandlers';
import CharacterDetailPage from '../DetailPage/CharacterDetailPage';
import LocationDetailPage from '../DetailPage/LocationDetailPage';
import EpisodeDetailPage from '../DetailPage/EpisodeDetailPage';

function RouteSwitch(props) {
  const { setPageInfo, pageInfo } = props;
  const { pathname } = window.location;
  const navigate = useNavigate();
  useEffect(() => {
    if (pathname === '/') {
      navigate('/character');
    }
    const pageType = pathname.split('/')[1];
    if (['character', 'location', 'episode'].includes(pageType)) {
      setPageInfo({ pageType });
    }
  }, [pathname]);

  return (
    <Routes>
      <Route path={`/${pageInfo?.pageType}`} element={<Dashboard />} />
      <Route path="/character/:id" element={<CharacterDetailPage />} />
      <Route path="/location/:id" element={<LocationDetailPage />} />
      <Route path="/episode/:id" element={<EpisodeDetailPage />} />
    </Routes>
  );
}

RouteSwitch.propTypes = {
  setPageInfo: PropTypes.func.isRequired,
  pageInfo: PropTypes.object.isRequired,
};

const mapStateToProps = ({ rickMortyStore }) => ({
  pageInfo: _get(rickMortyStore, 'pageInfo'),
});

const mapDispatchToProps = dispatch => ({
  setPageInfo: payload => dispatch(RickMortyActions.setPageInfo(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RouteSwitch);
