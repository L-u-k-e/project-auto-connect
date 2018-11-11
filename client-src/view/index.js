import * as Ramda from 'ramda';
import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { themr } from 'react-css-themr';
import { Drawer, DrawerAppContent } from 'rmwc/Drawer';
import { isUserSignedIn } from 'redux/selectors';
import wrapWithComponent from 'view/libraries/wrap-with-component';
import AppHeader from './components/app-header';
import AppBody from './components/app-body';
import SignInScreen from './components/sign-in-screen';
import baseTheme from './theme.css';





View.propTypes = {
  // provideTheme
  theme: PropTypes.object.isRequired
};
function View(props) {
  const { theme } = props;
  return (
    <div className={theme.view}>
      <AppHeader />
      <Drawer modal className={theme.drawer}>
        { /* <AppSidebar /> */}
      </Drawer>
      <DrawerAppContent className={classNames('mdc-top-app-bar--fixed-adjust', theme.drawerAppContent)}>
        <AppBody />
      </DrawerAppContent>
    </div>
  );
}





const provideTheme = themr('View', baseTheme);




SignInScreenRenderer.propTypes = {
  children: PropTypes.any.isRequired,
  signedIn: PropTypes.func.isRequired,
};
SignInScreenRenderer.defaultProps = {
};
function SignInScreenRenderer(props) {
  const { children, signedIn } = props;
  return signedIn ? children : <SignInScreen />;
}
const SignInScreenRenderer_Connected = connect(state => ({ signedIn: isUserSignedIn(state) }))(SignInScreenRenderer);
const renderSignInScreenIfSignedOut = wrapWithComponent(SignInScreenRenderer_Connected);





const ViewContainer = (
  Ramda.compose(
    provideTheme,
    renderSignInScreenIfSignedOut,
  )(View)
);
ViewContainer.displayName = 'ViewContainer';
ViewContainer.propTypes = {
  ...ViewContainer.propTypes
};
ViewContainer.defaultProps = {
  ...ViewContainer.defaultProps
};





export { View, ViewContainer };
export default ViewContainer;
