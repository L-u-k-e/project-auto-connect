import createReducer from 'libraries/create-reducer';
import * as actionTypes from 'redux/action-types';





const initialState = {
  signedIn: false,
  idToken: null,
  basicProfile: null
};

const subReducers = {
  [actionTypes.COMPLETE_SIGN_IN]: handleCompleteSignIn,
  [actionTypes.SIGN_IN_COMPLETION_SUCCESSFUL]: handleSignInCompletionSuccessful
};

export default createReducer(initialState, subReducers);





function handleCompleteSignIn(state, action) {
  const googleUser = action.payload;
  return {
    ...state,
    idToken: googleUser.getAuthResponse().id_token,
    basicProfile: googleUser.getBasicProfile()
  };
}





function handleSignInCompletionSuccessful(state) {
  return {
    ...state,
    signedIn: true,
  };
}
