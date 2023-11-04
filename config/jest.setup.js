/* eslint-disable import/no-extraneous-dependencies */

import 'jest-enzyme';
import { JSDOM } from 'jsdom';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import 'isomorphic-fetch';
import { configure } from '@testing-library/dom';
import 'jest-canvas-mock';
import Adapter from 'enzyme-adapter-react-16';

configure({
  adapter: new Adapter(),
  testIdAttribute: 'id',
});
const DEFAULT_HTML = '<html><body><div id="init-div"></div></body></html>';

global.document = new JSDOM(DEFAULT_HTML);
global.window = document.defaultView;
global.window.location = { pathname: '' };
global.navigator = window.navigator;
global.fetch = require('jest-fetch-mock');
global.__ = value => value;
global.window.String.prototype.replaceAll = function replaceAll(matchExpr, replaceFn) {
  return this.replace(new RegExp(matchExpr, 'g'), () => replaceFn);
};

/* Can be removed later */
global.console.warn = () => { };
global.console.info = () => { };
global.console.error = () => { };
