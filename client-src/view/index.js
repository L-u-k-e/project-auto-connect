import * as Ramda from 'ramda';
import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { themr } from 'react-css-themr';
import { Drawer } from 'rmwc/Drawer';
import {
  isUserSignedIn,
  isNavDrawerModal,
  isNavDrawerOpen,
  getUserIDToken,
  getUserBasicProfile,
  getAccessCode,
} from 'redux/selectors';
import { toggleNavDrawer, completeSignIn } from 'redux/action-creators';
import wrapWithComponent from 'view/libraries/wrap-with-component';
import AppHeader from './components/app-header';
import AppBody from './components/app-body';
import AppNotification from './components/app-notification';
import AppSidebar from './components/app-sidebar';
import SignInScreen from './components/sign-in-screen';
import CallInitiationDialog from './components/call-initiation-dialog';
import AnsweredCallDialog from './components/answered-call-dialog';
import AnsweredCallCompletedNotifier from './components/answered-call-completed-notifier';
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
        <AppSidebar />
        <a href="localhost"> link text </a>
      </Drawer>
      <AppBody
        className={classNames('mdc-top-app-bar--fixed-adjust', theme.body)}
      />
      <CallInitiationDialog />
      <AnsweredCallDialog />
      <AnsweredCallCompletedNotifier />
      <AppNotification />
    </div>
  );
}





const provideTheme = themr('View', baseTheme);




SignInScreenRenderer.propTypes = {
  children: PropTypes.any.isRequired,
  signedIn: PropTypes.bool.isRequired,
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





// If the app loads and an ID token is found in local storage, then the login screen wont render, but we still
// need to validate the ID token with the app server so we can get an access code and a client ID
class ConditionalSignInCompleter extends React.Component {
  static propTypes = {
    // connect (local wrapper)
    accessCode: PropTypes.number,
    idToken: PropTypes.string.isRequired,
    basicProfile: PropTypes.object.isRequired,
    completeSignIn: PropTypes.func.isRequired,

    children: PropTypes.any.isRequired,
  };

  static defaultProps = {
    accessCode: null,
  };

  componentWillMount = () => {
    const { accessCode, idToken, basicProfile } = this.props;
    if (accessCode === null) {
      this.props.completeSignIn({ idToken, basicProfile });
    }
  }

  render() {
    const { children } = this.props;
    return children;
  }
}
const ConditionalSignInCompleter_Connected = connect(
  state => ({
    accessCode: getAccessCode(state),
    idToken: getUserIDToken(state),
    basicProfile: getUserBasicProfile(state)
  }),
  { completeSignIn }
)(ConditionalSignInCompleter);
const completeSignInIfNecessary = wrapWithComponent(ConditionalSignInCompleter_Connected);





const ViewContainer = (
  Ramda.compose(
    provideTheme,
    renderSignInScreenIfSignedOut,
    provideNavDrawerTogglerControls,
    completeSignInIfNecessary,
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
