import * as Ramda from 'ramda';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { themr } from 'react-css-themr';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogButton,
} from 'rmwc/Dialog';
import { deactivateCallInitiationDialog, callLeads } from 'redux/action-creators';
import { getQueueStatus, isCallInitiationDialogActive, getAccessCode } from 'redux/selectors';
// import wrapWithFunctionChildComponent from 'view/libraries/wrap-with-function-child-component';
// import wrapWithComponent from 'view/libraries/wrap-with-component';
import queueStates from '../../../../libraries/queue-states';
import baseTheme from './theme.css';





CallInitiationDialog.propTypes = {
  // external
  className: PropTypes.string.isRequired,

  // provideTheme
  theme: PropTypes.object.isRequired,

  // provideQueueStatus
  queueStatus: PropTypes.string.isRequired,

  // controlDialogState
  active: PropTypes.bool.isRequired,

  // provideAccessCode
  accessCode: PropTypes.string.isRequired,

  // provideOnCall
  onCall: PropTypes.func.isRequired,
};
CallInitiationDialog.defaultProps = {};
function CallInitiationDialog(props) {
  const {
    theme,
    className,
    queueStatus,
    active,
    accessCode,
    onCall
  } = props;

  return (
    <Dialog
      className={classNames(className, theme.callInitiationDialog)}
      open={active}
    >
      <DialogTitle> Begin calling </DialogTitle>
      <DialogContent>
        <div>
          Queue Status: {queueStatus}
        </div>
        <div>
          accessCode: {accessCode}
        </div>
      </DialogContent>
      <DialogActions>
        <DialogButton>
          cancel
        </DialogButton>
        <DialogButton
          disabled={queueStatus !== queueStates.CONNECTED}
          onClick={onCall}
        >
          call
        </DialogButton>
      </DialogActions>
    </Dialog>
  );
}





const provideTheme = themr('CallInitiationDialog', baseTheme);





const provideQueueStatus = connect(state => ({ queueStatus: getQueueStatus(state) }));





const controlDialogState = connect(
  state => ({ active: isCallInitiationDialogActive(state) }),
  {
    onDeactivate: deactivateCallInitiationDialog
  }
);




const provideAccessCode = connect(state => ({ accessCode: getAccessCode(state) }));





const provideOnCall = connect(null, { onCall: callLeads });





const CallInitiationDialogContainer = (
  Ramda.compose(
    provideTheme,
    provideQueueStatus,
    controlDialogState,
    provideAccessCode,
    provideOnCall
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
