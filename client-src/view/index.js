import * as Ramda from 'ramda';
import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { themr } from 'react-css-themr';
import { Drawer, DrawerHeader, DrawerTitle, DrawerSubtitle } from 'rmwc/Drawer';
import { isUserSignedIn, isNavDrawerModal, isNavDrawerOpen } from 'redux/selectors';
import { toggleNavDrawer } from 'redux/action-creators';
import wrapWithComponent from 'view/libraries/wrap-with-component';
import AppHeader from './components/app-header';
import AppBody from './components/app-body';
import SignInScreen from './components/sign-in-screen';
import baseTheme from './theme.css';





View.propTypes = {
  // provideTheme
  theme: PropTypes.object.isRequired,

  // provideNavDrawerControls
  navDrawerOpen: PropTypes.bool.isRequired,
  navDrawerModal: PropTypes.bool.isRequired,
  onToggleNavDrawer: PropTypes.func.isRequired,
};
function View(props) {
  const { theme, navDrawerModal, navDrawerOpen, onToggleNavDrawer } = props;
  return (
    <div className={theme.view}>
      <AppHeader
        className={theme.header}
      />
      <Drawer
        open={navDrawerOpen}
        modal={navDrawerModal}
        onClose={onToggleNavDrawer}
        className={
          classNames(
            {
              'mdc-top-app-bar--fixed-adjust': !navDrawerModal,
              [theme.modal]: navDrawerModal
            },
            theme.drawer
          )
        }
      >
        <DrawerHeader>
          <DrawerTitle>DrawerHeader</DrawerTitle>
          <DrawerSubtitle>Subtitle</DrawerSubtitle>
        </DrawerHeader>
        <a href="localhost"> link text </a>
        { /* <AppSidebar /> */}
      </Drawer>
      <AppBody
        className={classNames('mdc-top-app-bar--fixed-adjust', theme.body)}

      />
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





const provideNavDrawerTogglerControls = connect(
  state => ({ navDrawerOpen: isNavDrawerOpen(state), navDrawerModal: isNavDrawerModal(state) }),
  { onToggleNavDrawer: toggleNavDrawer }
);




const ViewContainer = (
  Ramda.compose(
    provideTheme,
    renderSignInScreenIfSignedOut,
    provideNavDrawerTogglerControls
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
