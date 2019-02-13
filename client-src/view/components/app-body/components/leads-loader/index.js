import * as Ramda from 'ramda';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { themr } from 'react-css-themr';
import { loadLeads } from 'redux/action-creators';
// import {  } from 'redux/selectors';
// import { Card, } from 'rmwc/Card';
// import { Icon } from 'rmwc/Icon';
import Dropzone from 'react-dropzone';
import { Typography } from 'rmwc/Typography';
import wrapWithFunctionChildComponent from 'view/libraries/wrap-with-function-child-component';
// import wrapWithComponent from 'view/libraries/wrap-with-component';
import baseTheme from './theme.css';





LeadsLoader.propTypes = {
  // external
  className: PropTypes.string.isRequired,

  // provideTheme
  theme: PropTypes.object.isRequired,

  // provideOnDrop
  onDrop: PropTypes.func.isRequired,
};
LeadsLoader.defaultProps = {};
function LeadsLoader(props) {
  const {
    theme,
    className,
    onDrop,
  } = props;

  return (
    <div className={classNames(className, theme.leadsLoader)}>
      <Dropzone
        onDrop={onDrop}
        accept={[
          'text/csv',
          'application/vnd.ms-excel',
        ]}
        multiple={false}
        className={theme.dropzone}
      >
        <div className={theme.instructions}>
          <p className={theme.header}>
            <Typography use="headline5" className={theme.headline}>
              {'Add some leads to get started.'}
            </Typography>
            <Typography use="body1">
              {'Drop a CSV here or use the "LOAD LEADS" button.'}
            </Typography>
          </p>
          <p className={theme.rulesSection}>
            <Typography use="overline" className={theme.rulesLabel}>
            Rules
            </Typography>
            <Typography use="caption" className={theme.rulesList}>
              <ul>
                <li>
                  {'The first line of the CSV should contain header labels for the columns.'}
                </li>
                <li>
                  {'One column should contain phone numbers and should be labeled "phone" or "Phone".'}
                </li>
              </ul>
            </Typography>
          </p>
        </div>
      </Dropzone>
    </div>
  );
}





const provideTheme = themr('LeadsLoader', baseTheme);





OnDropProvider.propTypes = {
  // connect (loacl wrapper)
  loadLeads: PropTypes.func.isRequired,

  children: PropTypes.any.isRequired,
};
OnDropProvider.defaultProps = {
};
function OnDropProvider(props) {
  const { children } = props;
  return children({ onDrop });

  function onDrop(acceptedFiles, rejectedFiles) {
    const acceptedFile = acceptedFiles[0];
    if (!acceptedFile) {
      console.log(rejectedFiles);
      // props.setAppNotification({ text: 'Only CSV files are supported' });
    } else {
      console.log('accepted', acceptedFile);
      props.loadLeads(acceptedFile);
    }
  }
}
const OnDropProvider_Connected = connect(null, { loadLeads })(OnDropProvider);
const provideOnDrop = wrapWithFunctionChildComponent(OnDropProvider_Connected);





const LeadsLoaderContainer = (
  Ramda.compose(
    provideTheme,
    provideOnDrop
  )(LeadsLoader)
);
LeadsLoaderContainer.displayName = 'LeadsLoaderContainer';
LeadsLoaderContainer.propTypes = {
  ...LeadsLoaderContainer.propTypes,
  className: PropTypes.string,
};
LeadsLoaderContainer.defaultProps = {
  ...LeadsLoaderContainer.defaultProps,
  className: '',
};





export { LeadsLoader };
export default LeadsLoaderContainer;
