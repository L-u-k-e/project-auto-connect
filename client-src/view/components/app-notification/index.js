import * as Ramda from 'ramda';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAppNotificationState } from 'redux/selectors';
import { resetAppNotificationState } from 'redux/action-creators';
import { Snackbar } from 'rmwc/Snackbar';





AppNotification.propTypes = {
  // connectToNotificationState
  active: PropTypes.bool.isRequired,
  timeout: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  multiline: PropTypes.bool.isRequired,
  onReset: PropTypes.func.isRequired,
};
AppNotification.defaultProps = {};
function AppNotification(props) {
  const { text, active, timeout, multiline, onReset } = props;
  return (
    <Snackbar
      show={active}
      onHide={onReset}
      message={text}
      timeout={timeout}
      multiline={multiline}
      actionText="Dismiss"
      actionHandler={onReset}
      alignStart
    />
  );
}





const connectToNotificationState = Component => (
  connect(
    state => ({ ...getAppNotificationState(state) }),
    { onReset: resetAppNotificationState }
  )(Component)
);





const AppNotificationContainer = (
  Ramda.compose(
    connectToNotificationState
  )(AppNotification)
);
AppNotificationContainer.displayName = 'AppNotificationContainer';
AppNotificationContainer.propTypes = {};





export { AppNotification };
export default AppNotificationContainer;
