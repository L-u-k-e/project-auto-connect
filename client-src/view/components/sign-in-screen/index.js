import * as Ramda from 'ramda';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { themr } from 'react-css-themr';
import GoogleButton from 'react-google-button';
import { completeSignIn } from 'redux/action-creators';
// import {  } from 'redux/selectors';
import wrapWithFunctionChildComponent from 'view/libraries/wrap-with-function-child-component';
// import wrapWithComponent from 'view/libraries/wrap-with-component';
// import { Button } from 'rmwc/Button';
import baseTheme from './theme.css';





SignInScreen.propTypes = {
  // external
  className: PropTypes.string.isRequired,

  // provideOnStartSigningIn
  onStartSigningIn: PropTypes.func.isRequired,

  // provideTheme
  theme: PropTypes.object.isRequired
};
SignInScreen.defaultProps = {};
function SignInScreen(props) {
  const {
    theme,
    className,
    onStartSigningIn
  } = props;
  return (
    <div className={classNames(className, theme.signInScreen)}>
      Welcome To Auto Connect. Sign in with Google to get started.
      <GoogleButton
        type="light"
        onClick={onStartSigningIn}
      />
    </div>
  );
}





const provideTheme = themr('SignInScreen', baseTheme);





OnStartSigningInProvider.propTypes = {
  children: PropTypes.any.isRequired,
};
OnStartSigningInProvider.defaultProps = {
};
function OnStartSigningInProvider(props) {
  const { children } = props;
  return children({ onStartSigningIn });

  async function onStartSigningIn() {
    window.gapi.load('auth2', () => {
      window.gapi.auth2.init({
        client_id: '163932332389-4l61sekhdns727oks3fsr9q91ru4qp9v',
        fetch_basic_profile: true,
        ux_mode: 'poupup',
      })
      .then(() => window.gapi.auth2.getAuthInstance().signIn())
      .then(googleUser => {
        // once we have the google user we can get the ID token
        // after we have the ID token, we need to verify with the app server that the user (encoded in the token)
        // is one of our allowed users
        props.completeSignIn(googleUser);
      });
    });
  }
}
const OnStartSigningInProvider_Connected = connect(null, { completeSignIn })(OnStartSigningInProvider);
const provideOnStartSigningIn = wrapWithFunctionChildComponent(OnStartSigningInProvider_Connected);




const SignInScreenContainer = (
  Ramda.compose(
    provideTheme,
    provideOnStartSigningIn
  )(SignInScreen)
);
SignInScreenContainer.displayName = 'SignInScreenContainer';
SignInScreenContainer.propTypes = {
  ...SignInScreenContainer.propTypes,
  className: PropTypes.string,
};
SignInScreenContainer.defaultProps = {
  ...SignInScreenContainer.defaultProps,
  className: '',
};





export { SignInScreen };
export default SignInScreenContainer;
