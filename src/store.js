import { createStore, applyMiddleware } from 'redux';
// import logger from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from './reducers';

// eslint-disable-next-line

// const midl = [logger, thunk]
const midl = [thunk]

export default () => {
  const store = createStore(rootReducer, applyMiddleware(...midl));
  return store;
};
