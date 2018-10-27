import * as Ramda from 'ramda';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { themr } from 'react-css-themr';
// import {  } from 'redux/action-creators';
import { areLeadsLoaded } from 'redux/selectors';
// import wrapWithFunctionChildComponent from 'view/libraries/wrap-with-function-child-component';
// import wrapWithComponent from 'view/libraries/wrap-with-component';
import LeadsLoader from './components/leads-loader';
import LeadsList from './components/leads-list';
import baseTheme from './theme.css';





AppBody.propTypes = {
  // external
  className: PropTypes.string.isRequired,

  // provideTheme
  theme: PropTypes.object.isRequired,

  // provideLeadsLoaded
  leadsLoaded: PropTypes.bool.isRequired,
};
AppBody.defaultProps = {};
function AppBody(props) {
  const {
    theme,
    className,
    leadsLoaded
  } = props;

  return (
    <div className={classNames(className, theme.appBody)}>
      {leadsLoaded ? <LeadsList /> : <LeadsLoader />}
    </div>
  );
}





const provideTheme = themr('AppBody', baseTheme);




const provideLeadsLoaded = connect(state => ({ leadsLoaded: areLeadsLoaded(state) }));





const AppBodyContainer = (
  Ramda.compose(
    provideTheme,
    provideLeadsLoaded,
  )(AppBody)
);
AppBodyContainer.displayName = 'AppBodyContainer';
AppBodyContainer.propTypes = {
  ...AppBodyContainer.propTypes,
  className: PropTypes.string,
};
AppBodyContainer.defaultProps = {
  ...AppBodyContainer.defaultProps,
  className: '',
};





export { AppBody };
export default AppBodyContainer;
