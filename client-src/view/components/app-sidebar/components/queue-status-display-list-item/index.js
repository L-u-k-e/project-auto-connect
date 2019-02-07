import * as Ramda from 'ramda';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { themr } from 'react-css-themr';
// import {  } from 'redux/action-creators';
import { getQueueStatus, getAccessCode } from 'redux/selectors';
import {
  ListItem,
  ListItemText,
  ListItemPrimaryText,
  ListItemSecondaryText
} from 'rmwc/List';
// import wrapWithFunctionChildComponent from 'view/libraries/wrap-with-function-child-component';
// import wrapWithComponent from 'view/libraries/wrap-with-component';
// import queueStates from '../../../../libraries/queue-states';
import baseTheme from './theme.css';





QueueStatusDisplayListItem.propTypes = {
  // external
  className: PropTypes.string.isRequired,

  // provideQueueStatus
  queueStatus: PropTypes.string.isRequired,

  // provideAccessCode
  accessCode: PropTypes.string.isRequired,

  // provideTheme
  theme: PropTypes.object.isRequired
};
QueueStatusDisplayListItem.defaultProps = {};
function QueueStatusDisplayListItem(props) {
  const {
    theme,
    className,
    queueStatus,
    accessCode,
  } = props;

  return (
    <ListItem className={classNames(className, theme.queueStatusDisplayListItem)} ripple={false}>
      <ListItemText>
        <ListItemPrimaryText> Queue Status: {queueStatus} </ListItemPrimaryText>
        <ListItemSecondaryText> Dial: 315-627-6319 # {accessCode} </ListItemSecondaryText>
      </ListItemText>
    </ListItem>
  );
}





const provideTheme = themr('QueueStatusDisplayListItem', baseTheme);





const provideQueueStatus = connect(state => ({ queueStatus: getQueueStatus(state) }));





const provideAccessCode = connect(state => ({ accessCode: getAccessCode(state) }));





const QueueStatusDisplayListItemContainer = (
  Ramda.compose(
    provideTheme,
    provideQueueStatus,
    provideAccessCode
  )(QueueStatusDisplayListItem)
);
QueueStatusDisplayListItemContainer.displayName = 'QueueStatusDisplayListItemContainer';
QueueStatusDisplayListItemContainer.propTypes = {
  ...QueueStatusDisplayListItemContainer.propTypes,
  className: PropTypes.string,
};
QueueStatusDisplayListItemContainer.defaultProps = {
  ...QueueStatusDisplayListItemContainer.defaultProps,
  className: '',
};





export { QueueStatusDisplayListItem };
export default QueueStatusDisplayListItemContainer;
