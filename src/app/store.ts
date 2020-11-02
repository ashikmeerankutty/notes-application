import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import reducers from './reducers';

export default function store() {
  return createStore(reducers, {}, composeWithDevTools(applyMiddleware(reduxThunk)));
}
