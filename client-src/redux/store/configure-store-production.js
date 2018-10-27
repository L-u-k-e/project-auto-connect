import { createStore, applyMiddleware, compose } from 'redux';
import { responsiveStoreEnhancer } from 'redux-responsive';
import resizeListenterMiddleware from 'redux/middleware/resize-listener-middleware';
import rootReducer from 'redux/reducers';
import leadsLoaderMiddleware from '../middleware/leads-loader-middleware';

const enhancer = compose(
  responsiveStoreEnhancer,
  applyMiddleware(
    leadsLoaderMiddleware,
    resizeListenterMiddleware,
  )
);


export default function (initialState) {
  return createStore(rootReducer, initialState, enhancer);
}
