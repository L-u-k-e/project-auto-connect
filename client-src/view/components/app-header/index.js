import * as Ramda from 'ramda';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// import { connect } from 'react-redux';
import { themr } from 'react-css-themr';
// import {  } from 'redux/action-creators';
// import {  } from 'redux/selectors';
import wrapWithFunctionChildComponent from 'view/libraries/wrap-with-function-child-component';
// import wrapWithComponent from 'view/libraries/wrap-with-component';
import { Button } from 'rmwc/Button';
import {
  TopAppBar,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarNavigationIcon,
  TopAppBarTitle,
  // TopAppBarActionItem
} from 'rmwc/TopAppBar';
import baseTheme from './theme.css';





AppHeader.propTypes = {
  // external
  className: PropTypes.string.isRequired,

  // provideOnSignInClick
  onSignInClick: PropTypes.func.isRequired,

  // provideTheme
  theme: PropTypes.object.isRequired
};
AppHeader.defaultProps = {};
function AppHeader(props) {
  const {
    theme,
    className,
    onSignInClick
  } = props;

  return (
    <TopAppBar fixed className={classNames(className, theme.appHeader)}>
      <TopAppBarRow>
        <TopAppBarSection alignStart>
          <TopAppBarNavigationIcon icon="menu" />
          <TopAppBarTitle> Queue Status: disconnected </TopAppBarTitle>
        </TopAppBarSection>
        <TopAppBarSection alignEnd>
          <Button raised theme="secondary-bg on-secondary"> Load Leads </Button>
          <Button raised theme="secondary-bg on-secondary" onClick={onSignInClick}> SIGN IN TO GOOGS </Button>
        </TopAppBarSection>
      </TopAppBarRow>
    </TopAppBar>
  );
}





const provideTheme = themr('AppHeader', baseTheme);





OnSignInClickProvider.propTypes = {
  children: PropTypes.any.isRequired,
};
OnSignInClickProvider.defaultProps = {
};
function OnSignInClickProvider(props) {
  const { children } = props;
  return children({ onSignInClick });

  async function onSignInClick() {
    // first lets fetch the discovery document
    const discoveryResponse = await fetch('https://accounts.google.com/.well-known/openid-configuration');
    const openIDConnectDiscoveryDocument = await discoveryResponse.json();

    const params = {
      scope: 'profile openId email',
      redirect_uri: 'https://tolocalhost.com/oauth2-callback',
      response_type: 'code',
      client_id: '163932332389-4l61sekhdns727oks3fsr9q91ru4qp9v'
    };
    const queryString = (
      Object.keys(params)
      .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
      .join('&')
    );
    window.location.replace(`${openIDConnectDiscoveryDocument.authorization_endpoint}?${queryString}`);
  }
}
const provideOnSignInClick = wrapWithFunctionChildComponent(OnSignInClickProvider);




const AppHeaderContainer = (
  Ramda.compose(
    provideTheme,
    provideOnSignInClick
  )(AppHeader)
);
AppHeaderContainer.displayName = 'AppHeaderContainer';
AppHeaderContainer.propTypes = {
  ...AppHeaderContainer.propTypes,
  className: PropTypes.string,
};
AppHeaderContainer.defaultProps = {
  ...AppHeaderContainer.defaultProps,
  className: '',
};





export { AppHeader };
export default AppHeaderContainer;
