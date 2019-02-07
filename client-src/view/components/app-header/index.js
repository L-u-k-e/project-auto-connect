import * as Ramda from 'ramda';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { themr } from 'react-css-themr';
import { toggleNavDrawer, activateCallInitiationDialog } from 'redux/action-creators';
import {
  isNavDrawerModal,
  areLeadsLoaded,
  isACallInProgress,
  isLeadCallingPaused,
  isLeadCallingCompleted,
  isAnAnsweredCallInProgress,
} from 'redux/selectors';
// import wrapWithFunctionChildComponent from 'view/libraries/wrap-with-function-child-component';
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
  } = props;

  return (
    <TopAppBar fixed className={classNames(className, theme.appHeader)}>
      <TopAppBarRow>
        <TopAppBarSection alignStart>
          { displayNavDrawerToggler && <TopAppBarNavigationIcon icon="menu" onClick={onNavDrawerToggle} /> }
          <TopAppBarTitle> AutoConnect </TopAppBarTitle>
        </TopAppBarSection>
        <TopAppBarSection alignEnd>
          {leadsLoaded && !callingLeads && !leadCallingPaused && (
            <Button
              raised
              theme="secondary-bg on-secondary"
              onClick={onCallLeads}
            >
              Call
            </Button>
          )}
          {(callingLeads || answeredCallInProgress) && (
            <React.Fragment>
              <Button
                raised
                theme="secondary-bg on-secondary"
              >
                Pause Calling
              </Button>
            </React.Fragment>
          )}
          {!callingLeads && leadCallingPaused && !answeredCallInProgress && (
            <React.Fragment>
              <Button
                raised
                theme="secondary-bg on-secondary"
              >
                Clear Leads List
              </Button>
              {!leadCallingCompleted && (
                <Button
                  raised
                  theme="secondary-bg on-secondary"
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





const provideOnCallLeads = connect(null, { onCallLeads: activateCallInitiationDialog });





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
