import * as Ramda from 'ramda';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { themr } from 'react-css-themr';
import {
  toggleNavDrawer,
  activateCallInitiationDialog,
  clearLeads,
  callLeads,
} from 'redux/action-creators';
import {
  isNavDrawerModal,
  areLeadsLoaded,
  isACallInProgress,
  isLeadCallingPaused,
  isLeadCallingCompleted,
  isAnAnsweredCallInProgress,
  getQueueStatus,
  getBrowser,
} from 'redux/selectors';
import wrapWithFunctionChildComponent from 'view/libraries/wrap-with-function-child-component';
// import wrapWithComponent from 'view/libraries/wrap-with-component';
import { Button } from '@rmwc/button';
import {
  TopAppBar,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarNavigationIcon,
  TopAppBarTitle,
  // TopAppBarActionItem
} from '@rmwc/top-app-bar';
import queueStates from '../../../../libraries/queue-states';
import LoadLeadsButton from './components/load-leads-button';
import baseTheme from './theme.css';





AppHeader.propTypes = {
  // external
  className: PropTypes.string.isRequired,

  // provideNavDrawerTogglerControls
  displayNavDrawerToggler: PropTypes.bool.isRequired,
  onNavDrawerToggle: PropTypes.func.isRequired,

  // provideLeadsLoaded
  leadsLoaded: PropTypes.bool.isRequired,

  // provideCallingLeads
  callingLeads: PropTypes.bool.isRequired,

  // provideLeadCallingPaused
  leadCallingPaused: PropTypes.bool.isRequired,

  // provideLeadCallingCompleted
  leadCallingCompleted: PropTypes.bool.isRequired,

  // provideOnCallLeads
  onCallLeads: PropTypes.func.isRequired,

  // provideAnsweredCallInProgress
  answeredCallInProgress: PropTypes.bool.isRequired,

  // provideOnClearLeads
  onClearLeads: PropTypes.func.isRequired,

  // provideBrowser
  browser: PropTypes.object.isRequired,

  // provideTheme
  theme: PropTypes.object.isRequired
};
AppHeader.defaultProps = {};
function AppHeader(props) {
  const {
    theme,
    className,
    displayNavDrawerToggler,
    onNavDrawerToggle,
    leadsLoaded,
    callingLeads,
    leadCallingPaused,
    leadCallingCompleted,
    onCallLeads,
    answeredCallInProgress,
    onClearLeads,
    browser
  } = props;

  return (
    <TopAppBar fixed className={classNames(className, theme.appHeader)}>
      <TopAppBarRow>
        <TopAppBarSection alignStart>
          { displayNavDrawerToggler && (
            <TopAppBarNavigationIcon
              className={theme.navigationIcon}
              icon="menu"
              onClick={onNavDrawerToggle}
            />
          )}
          {browser.greaterThan.xs && <TopAppBarTitle> AutoConnect </TopAppBarTitle>}
        </TopAppBarSection>
        <TopAppBarSection alignEnd>
          {!leadsLoaded && (
            <React.Fragment>
              <LoadLeadsButton />
            </React.Fragment>
          )}
          {leadsLoaded && !callingLeads && !leadCallingPaused && (
            <React.Fragment>
              <Button
                onClick={onCallLeads}
                icon="call"
              >
                Call
              </Button>
              <Button onClick={onClearLeads}>
                {browser.greaterThan.xs ? 'Clear Leads List' : 'Clear Leads'}
              </Button>
            </React.Fragment>
          )}
          {(callingLeads || answeredCallInProgress) && (
            <React.Fragment>
              <Button>
                Pause Calling
              </Button>
            </React.Fragment>
          )}
          {!callingLeads && leadCallingPaused && !answeredCallInProgress && (
            <React.Fragment>
              <Button onClick={onClearLeads}>
                {browser.greaterThan.xs ? 'Clear Leads List' : 'Clear Leads'}
              </Button>
              {!leadCallingCompleted && (
                <Button
                  onClick={onCallLeads}
                >
                  Resume Calling Leads
                </Button>
              )}
            </React.Fragment>
          )}
        </TopAppBarSection>
      </TopAppBarRow>
    </TopAppBar>
  );
}





const provideTheme = themr('AppHeader', baseTheme);





const provideNavDrawerTogglerControls = connect(
  state => ({ displayNavDrawerToggler: isNavDrawerModal(state) }),
  { onNavDrawerToggle: toggleNavDrawer }
);





const provideLeadsLoaded = connect(state => ({ leadsLoaded: areLeadsLoaded(state) }));





const provideCallingLeads = connect(state => ({ callingLeads: isACallInProgress(state) }));





const provideLeadCallingPaused = connect(state => ({ leadCallingPaused: isLeadCallingPaused(state) }));





const provideLeadCallingCompleted = connect(state => ({ leadCallingCompleted: isLeadCallingCompleted(state) }));





const provideAnsweredCallInProgress = connect(
  state => ({ answeredCallInProgress: isAnAnsweredCallInProgress(state) })
);





const provideBrowser = connect(state => ({ browser: getBrowser(state) }));





OnCallLeadsProvider.propTypes = {
  // connect (local wrapper)
  queueStatus: PropTypes.string.isRequired,
  activateCallInitiationDialog: PropTypes.func.isRequired,
  callLeads: PropTypes.func.isRequired,

  children: PropTypes.any.isRequired,
};
OnCallLeadsProvider.defaultProps = {
};
function OnCallLeadsProvider(props) {
  const { children, queueStatus } = props;
  return children({ onCallLeads });
  function onCallLeads() {
    if (queueStatus === queueStates.CONNECTED) {
      props.callLeads();
    } else {
      props.activateCallInitiationDialog();
    }
  }
}
const OnCallLeadsProvider_Connected = connect(
  state => ({ queueStatus: getQueueStatus(state) }),
  { activateCallInitiationDialog, callLeads }
)(OnCallLeadsProvider);
const provideOnCallLeads = wrapWithFunctionChildComponent(OnCallLeadsProvider_Connected);





const provideOnClearLeads = connect(null, { onClearLeads: clearLeads });





const AppHeaderContainer = (
  Ramda.compose(
    provideTheme,
    provideNavDrawerTogglerControls,
    provideLeadsLoaded,
    provideCallingLeads,
    provideLeadCallingPaused,
    provideLeadCallingCompleted,
    provideAnsweredCallInProgress,
    provideOnCallLeads,
    provideOnClearLeads,
    provideBrowser
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
