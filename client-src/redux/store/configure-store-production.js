import { createStore, applyMiddleware, compose } from 'redux';
import { responsiveStoreEnhancer } from 'redux-responsive';
import resizeListenterMiddleware from 'redux/middleware/resize-listener-middleware';
import rootReducer from 'redux/reducers';
import apiServerMiddleware from '../middleware/api-server-middleware';
import callLeadsMiddleware from '../middleware/call-leads-middleware';
import leadsLoaderMiddleware from '../middleware/leads-loader-middleware';
import persistSignInStateToLocalStorage from '../enhancers/persist-sign-in-state-to-local-storage';





const enhancer = compose(
  responsiveStoreEnhancer,
  persistSignInStateToLocalStorage,
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
