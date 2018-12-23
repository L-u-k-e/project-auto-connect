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
// import {  } from 'redux/action-creators';
import { getQueueStatus, isAnsweredCallDialogActive, getAnsweredCallInProgressLead } from 'redux/selectors';
import wrapWithFunctionChildComponent from 'view/libraries/wrap-with-function-child-component';
// import wrapWithComponent from 'view/libraries/wrap-with-component';
import baseTheme from './theme.css';





AnsweredCallDialog.propTypes = {
  // external
  className: PropTypes.string.isRequired,

  // provideTheme
  theme: PropTypes.object.isRequired,

  // controlDialogState
  active: PropTypes.bool.isRequired,

  // provideLead
  lead: PropTypes.object,

};
AnsweredCallDialog.defaultProps = {
  lead: null
};
function AnsweredCallDialog(props) {
  const {
    theme,
    className,
    active,
    lead
  } = props;

  return (
    <Dialog
      className={classNames(className, theme.AnsweredCallDialog)}
      open={active}
    >
      <DialogTitle> Call In Progress </DialogTitle>
      <DialogContent>
        {lead && JSON.stringify(lead, null, 2)}
      </DialogContent>
      <DialogActions>
        <DialogButton>
          cancel
        </DialogButton>
      </DialogActions>
    </Dialog>
  );
}





const provideTheme = themr('AnsweredCallDialog', baseTheme);





const provideQueueStatus = connect(state => ({ queueStatus: getQueueStatus(state) }));





const controlDialogState = connect(
  state => ({ active: isAnsweredCallDialogActive(state) }),
  {
    onDeactivate: () => {}
  }
);





const provideLead = connect(state => ({ lead: getAnsweredCallInProgressLead(state) }));





OnCancelProvider.propTypes = {
  // controlDialogState
  onDeactivate: PropTypes.func.isRequired,

  children: PropTypes.any.isRequired,
};
OnCancelProvider.defaultProps = {
};
function OnCancelProvider(props) {
  const { children } = props;
  return children({ onCancel });

  function onCancel() {
    props.onDeactivate();
  }
}
const provideOnCancel = wrapWithFunctionChildComponent(OnCancelProvider);





const AnsweredCallDialogContainer = (
  Ramda.compose(
    provideTheme,
    provideQueueStatus,
    controlDialogState,
    provideLead,
    provideOnCancel,
  )(AnsweredCallDialog)
);
AnsweredCallDialogContainer.displayName = 'AnsweredCallDialogContainer';
AnsweredCallDialogContainer.propTypes = {
  ...AnsweredCallDialogContainer.propTypes,
  className: PropTypes.string,
};
AnsweredCallDialogContainer.defaultProps = {
  ...AnsweredCallDialogContainer.defaultProps,
  className: '',
};





export { AnsweredCallDialog };
export default AnsweredCallDialogContainer;
