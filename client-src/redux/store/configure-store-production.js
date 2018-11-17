import { createStore, applyMiddleware, compose } from 'redux';
import { responsiveStoreEnhancer } from 'redux-responsive';
import persistState from 'redux-localstorage';
import resizeListenterMiddleware from 'redux/middleware/resize-listener-middleware';
import rootReducer from 'redux/reducers';
import apiServerMiddleware from '../middleware/api-server-middleware';
import callLeadsMiddleware from '../middleware/call-leads-middleware';
import leadsLoaderMiddleware from '../middleware/leads-loader-middleware';

const enhancer = compose(
  responsiveStoreEnhancer,
  persistState('id-token', { key: 'id-token' }),
  applyMiddleware(
    callLeadsMiddleware,
    leadsLoaderMiddleware,
    apiServerMiddleware,
    resizeListenterMiddleware,
  )
);


export default function (initialState) {
  return createStore(rootReducer, initialState, enhancer);
}
