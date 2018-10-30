import { createStore, applyMiddleware, compose } from 'redux';
import { responsiveStoreEnhancer } from 'redux-responsive';
import resizeListenterMiddleware from 'redux/middleware/resize-listener-middleware';
import rootReducer from 'redux/reducers';
import apiServerMiddleware from '../middleware/api-server-middleware';
import leadsLoaderMiddleware from '../middleware/leads-loader-middleware';

const enhancer = compose(
  responsiveStoreEnhancer,
  applyMiddleware(
    leadsLoaderMiddleware,
    apiServerMiddleware,
    resizeListenterMiddleware,
  )
);


export default function (initialState) {
  return createStore(rootReducer, initialState, enhancer);
}
