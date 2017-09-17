import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './containers/App';

const render = () => {
  ReactDOM.render((
    <BrowserRouter>
      <App />
    </BrowserRouter>
  ), document.getElementById('app'));
};

render();

if (module.hot) {
  module.hot.accept('./containers/App', () => {
    render();
  });
}
