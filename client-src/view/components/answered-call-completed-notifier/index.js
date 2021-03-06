import * as Ramda from 'ramda';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { themr } from 'react-css-themr';
import { Snackbar } from '@rmwc/snackbar';
// import {  } from 'redux/action-creators';
import {
  isAnAnsweredCallInProgress,
} from 'redux/selectors';
import wrapWithFunctionChildComponent from 'view/libraries/wrap-with-function-child-component';
// import wrapWithComponent from 'view/libraries/wrap-with-component';
import baseTheme from './theme.css';





AnsweredCallCompletedNotifier.propTypes = {
  // external
  className: PropTypes.string.isRequired,

  // provideTheme
  theme: PropTypes.object.isRequired,

  // controlDialogState
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};
AnsweredCallCompletedNotifier.defaultProps = {};
function AnsweredCallCompletedNotifier(props) {
  const {
    theme,
    className,
    show,
    onHide
  } = props;

  return (
    <Snackbar
      className={classNames(className, theme.answeredCallCompletedNotifier)}
      open={show}
      onClose={onHide}
      message="Call Completed. Calling has been paused."
      timeout={2000}
      leading
    />
  );
}





const provideTheme = themr('AnsweredCallCompletedNotifier', baseTheme);





class DialogStateController extends React.Component {
  static propTypes = {
    answeredCallInProgress: PropTypes.bool.isRequired,
    children: PropTypes.any.isRequired,
  };

  static defaultProps = {
  };

  state = {
    show: false,
  };

  componentWillReceiveProps = (nextProps) => {
    if (this.props.answeredCallInProgress && !nextProps.answeredCallInProgress) {
      this.setState({ show: true });
    }
  }

  onHide = () => {
    this.setState({ show: false });
  }

  render() {
    const { children } = this.props;
    const { show } = this.state;
    return children({ show, onHide: this.onHide });
  }
}
const DialogStateController_Connected = connect(
  state => ({ answeredCallInProgress: isAnAnsweredCallInProgress(state) })
)(DialogStateController);
const controlDialogState = wrapWithFunctionChildComponent(DialogStateController_Connected);





const AnsweredCallCompletedNotifierContainer = (
  Ramda.compose(
    provideTheme,
    controlDialogState,
  )(AnsweredCallCompletedNotifier)
);
AnsweredCallCompletedNotifierContainer.displayName = 'AnsweredCallCompletedNotifierContainer';
AnsweredCallCompletedNotifierContainer.propTypes = {
  ...AnsweredCallCompletedNotifierContainer.propTypes,
  className: PropTypes.string,
};
AnsweredCallCompletedNotifierContainer.defaultProps = {
  ...AnsweredCallCompletedNotifierContainer.defaultProps,
  className: '',
};





export { AnsweredCallCompletedNotifier };
export default AnsweredCallCompletedNotifierContainer;
