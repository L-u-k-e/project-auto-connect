import { createStore, applyMiddleware, compose } from 'redux';
import { responsiveStoreEnhancer } from 'redux-responsive';
import { createLogger } from 'redux-logger';
import resizeListenterMiddleware from 'redux/middleware/resize-listener-middleware';
import rootReducer from 'redux/reducers';
import apiServerMiddleware from '../middleware/api-server-middleware';
import callLeadsMiddleware from '../middleware/call-leads-middleware';
import leadsLoaderMiddleware from '../middleware/leads-loader-middleware';
import signInMiddleware from '../middleware/sign-in-middleware';
import queueStatusMiddleware from '../middleware/queue-status-middleware';
import hangupAnsweredCallMiddleware from '../middleware/hangup-answered-call-middleware';
// import persistSignInStateToLocalStorage from '../enhancers/persist-sign-in-state-to-local-storage';



/* eslint-disable no-underscore-dangle */
let composeEnhancers = compose;
if (typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
}
/* eslint-enable no-underscore-dangle */


const logger = createLogger({ level: 'info', collapsed: true });


const enhancer = composeEnhancers(
  responsiveStoreEnhancer,
  // persistSignInStateToLocalStorage,
  applyMiddleware(
    signInMiddleware,
    callLeadsMiddleware,
    hangupAnsweredCallMiddleware,
    leadsLoaderMiddleware,
    apiServerMiddleware,
    resizeListenterMiddleware,
    queueStatusMiddleware,
    logger
  )
);


export default function (initialState) {
  return createStore(rootReducer, initialState, enhancer);
}
