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
} from '@rmwc/dialog';
import { hangupAnsweredCall } from 'redux/action-creators';
import { getQueueStatus, isAnsweredCallDialogActive, getAnsweredCallInProgressLead } from 'redux/selectors';
// import wrapWithFunctionChildComponent from 'view/libraries/wrap-with-function-child-component';
import PropertyDisplay from 'view/components/property-display';
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

  // provideOnHangupAnsweredCall
  onHangUpAnsweredCall: PropTypes.func.isRequired,

};
AnsweredCallDialog.defaultProps = {
  lead: {}
};
function AnsweredCallDialog(props) {
  const {
    theme,
    className,
    active,
    lead,
    onHangUpAnsweredCall
  } = props;

  return (
    <Dialog
      className={classNames(className, theme.AnsweredCallDialog)}
      open={active}
    >
      <DialogTitle> Call In Progress </DialogTitle>
      <DialogContent>
        {Ramda.toPairs(lead).map(([attrName, attrValue]) =>
          <PropertyDisplay key={attrName} label={attrName} value={attrValue} />
        )}
      </DialogContent>
      <DialogActions>
        <DialogButton onClick={onHangUpAnsweredCall}>
          Hang up
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





const provideOnHangupAnsweredCall = connect(null, { onHangUpAnsweredCall: hangupAnsweredCall });





const AnsweredCallDialogContainer = (
  Ramda.compose(
    provideTheme,
    provideQueueStatus,
    controlDialogState,
    provideLead,
    provideOnHangupAnsweredCall,
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
