import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Routes from './app/routes';
import configureStore from './app/store';

const App = () => (
  <Provider store={configureStore()}>
    <Routes />
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('app'));
