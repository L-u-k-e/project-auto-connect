import * as Ramda from 'ramda';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// import { connect } from 'react-redux';
import { themr } from 'react-css-themr';
// import {  } from 'redux/action-creators';
// import {  } from 'redux/selectors';
import { List } from 'rmwc/List';
// import wrapWithFunctionChildComponent from 'view/libraries/wrap-with-function-child-component';
// import wrapWithComponent from 'view/libraries/wrap-with-component';
import QueueStatusDisplayListItem from './components/queue-status-display-list-item';
import baseTheme from './theme.css';





Sidebar.propTypes = {
  // external
  className: PropTypes.string.isRequired,

  // provideTheme
  theme: PropTypes.object.isRequired
};
Sidebar.defaultProps = {};
function Sidebar(props) {
  const {
    theme,
    className,
  } = props;

  return (
    <div className={classNames(className, theme.sidebar)}>
      <List twoLine>
        <QueueStatusDisplayListItem />
      </List>
    </div>
  );
}





const provideTheme = themr('Sidebar', baseTheme);





const SidebarContainer = (
  Ramda.compose(
    provideTheme,
  )(Sidebar)
);
SidebarContainer.displayName = 'SidebarContainer';
SidebarContainer.propTypes = {
  ...SidebarContainer.propTypes,
  className: PropTypes.string,
};
SidebarContainer.defaultProps = {
  ...SidebarContainer.defaultProps,
  className: '',
};





export { Sidebar };
export default SidebarContainer;
