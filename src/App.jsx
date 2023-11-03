import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rickMortyStore from './store';
import './App.css';
import RouteSwitch from './pages/base';

function App() {
  const store = configureStore({
    reducer: {
      rickMortyStore,
    },
  });
  return (
    <div className="App">
      <Provider store={store}>
        <RouteSwitch />
      </Provider>
    </div>
  );
}

export default App;
