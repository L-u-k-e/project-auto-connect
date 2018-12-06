import * as Ramda from 'ramda';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// import { connect } from 'react-redux';
import { themr } from 'react-css-themr';
import {
  Dialog,
  DialogTitle,
  DialogContent
} from 'rmwc/Dialog';
// import {  } from 'redux/action-creators';
// import {  } from 'redux/selectors';
// import wrapWithFunctionChildComponent from 'view/libraries/wrap-with-function-child-component';
// import wrapWithComponent from 'view/libraries/wrap-with-component';
import baseTheme from './theme.css';





CallInitiationDialog.propTypes = {
  // external
  className: PropTypes.string.isRequired,

  // provideTheme
  theme: PropTypes.object.isRequired
};
CallInitiationDialog.defaultProps = {};
function CallInitiationDialog(props) {
  const {
    theme,
    className,
  } = props;

  return (
    <Dialog
      className={classNames(className, theme.callInitiationDialog)}
      open
    >
      <DialogTitle> Begin calling </DialogTitle>
      <DialogContent>
        <div className={theme.div}>
          Queue Status: disconnected
        </div>
        <div>
          hi more content goes here
        </div>
      </DialogContent>
    </Dialog>
  );
}





const provideTheme = themr('CallInitiationDialog', baseTheme);





const CallInitiationDialogContainer = (
  Ramda.compose(
    provideTheme,
  )(CallInitiationDialog)
);
CallInitiationDialogContainer.displayName = 'CallInitiationDialogContainer';
CallInitiationDialogContainer.propTypes = {
  ...CallInitiationDialogContainer.propTypes,
  className: PropTypes.string,
};
CallInitiationDialogContainer.defaultProps = {
  ...CallInitiationDialogContainer.defaultProps,
  className: '',
};





export { CallInitiationDialog };
export default CallInitiationDialogContainer;
