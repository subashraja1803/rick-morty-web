/* eslint-disable import/no-extraneous-dependencies */

import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { configure } from '@testing-library/dom';

configure({
  testIdAttribute: 'id',
});

global.window = document.defaultView;
global.window.location = { pathname: '' };
global.navigator = window.navigator;
global.fetch = require('jest-fetch-mock');
global.__ = value => value;
global.window.String.prototype.replaceAll = function replaceAll(matchExpr, replaceFn) {
  return this.replace(new RegExp(matchExpr, 'g'), () => replaceFn);
};
