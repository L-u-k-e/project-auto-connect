import { createStore, applyMiddleware, compose } from 'redux';
import { responsiveStoreEnhancer } from 'redux-responsive';
import { createLogger } from 'redux-logger';
import persistState from 'redux-localstorage';
import resizeListenterMiddleware from 'redux/middleware/resize-listener-middleware';
import rootReducer from 'redux/reducers';
import apiServerMiddleware from '../middleware/api-server-middleware';
import leadsLoaderMiddleware from '../middleware/leads-loader-middleware';
import signInMiddleware from '../middleware/sign-in-middleware';



/* eslint-disable no-underscore-dangle */
let composeEnhancers = compose;
if (typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
}
/* eslint-enable no-underscore-dangle */


const logger = createLogger({ level: 'info', collapsed: true });


const enhancer = composeEnhancers(
  responsiveStoreEnhancer,
  persistState('signInStatus', { key: 'sign-in-status' }),
  applyMiddleware(
    signInMiddleware,
    leadsLoaderMiddleware,
    apiServerMiddleware,
    resizeListenterMiddleware,
    logger
  )
);


export default function (initialState) {
  return createStore(rootReducer, initialState, enhancer);
}
