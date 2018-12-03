import createReducer from 'libraries/create-reducer';
import * as actionTypes from 'redux/action-types';





const initialState = {
  signedIn: false,
  signInInProgress: false,
  idToken: null,
  basicProfile: null,
};

const subReducers = {
  [actionTypes.START_SIGN_IN]: startSignIn,
  [actionTypes.COMPLETE_SIGN_IN]: handleCompleteSignIn,
  [actionTypes.STOP_SIGN_IN]: stopSignIn,
  [actionTypes.SIGN_IN_COMPLETION_SUCCESSFUL]: handleSignInCompletionSuccessful
};

export default createReducer(initialState, subReducers);





function handleCompleteSignIn(state, action) {
  const { idToken, basicProfile } = action.payload;
  return {
    ...state,
    idToken,
    basicProfile,
    signedIn: false,
    signInInProgress: true,
  };
}





function handleSignInCompletionSuccessful(state) {
  return {
    ...state,
    signInInProgress: false,
    signedIn: true,
  };
}





function startSignIn(state) {
  return {
    ...state,
    signedIn: false,
    signInInProgress: true
  };
}




function stopSignIn(state) {
  return {
    ...state,
    signInInProgress: false
  };
}
