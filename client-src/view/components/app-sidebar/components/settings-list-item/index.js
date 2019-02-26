import * as Ramda from 'ramda';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { themr } from 'react-css-themr';
import { connect } from 'react-redux';
import { activateSettingsAndHelpDialog } from 'redux/action-creators';
import {
  ListItem,
  ListItemText,
  ListItemPrimaryText,
  ListItemSecondaryText,
  ListItemGraphic
} from '@rmwc/list';
// import wrapWithFunctionChildComponent from 'view/libraries/wrap-with-function-child-component';
// import wrapWithComponent from 'view/libraries/wrap-with-component';
import baseTheme from './theme.css';





SettingsListItem.propTypes = {
  // external
  className: PropTypes.string.isRequired,

  // provideTheme
  theme: PropTypes.object.isRequired,

  // provideOnClick
  onClick: PropTypes.func.isRequired
};
SettingsListItem.defaultProps = {};
function SettingsListItem(props) {
  const {
    theme,
    className,
    onClick,
  } = props;

  return (
    <ListItem
      ripple
      className={classNames(className, theme.settingsListItem)}
      onClick={onClick}
    >
      <ListItemGraphic icon="settings" />
      <ListItemText>
        <ListItemPrimaryText> Settings  </ListItemPrimaryText>
        <ListItemSecondaryText> and help, credits, etc </ListItemSecondaryText>
      </ListItemText>
    </ListItem>
  );
}





const provideTheme = themr('SettingsListItem', baseTheme);





const provideOnClick = connect(null, { onClick: activateSettingsAndHelpDialog });





const SettingsListItemContainer = (
  Ramda.compose(
    provideTheme,
    provideOnClick
  )(SettingsListItem)
);
SettingsListItemContainer.displayName = 'SettingsListItemContainer';
SettingsListItemContainer.propTypes = {
  ...SettingsListItemContainer.propTypes,
  className: PropTypes.string,
};
SettingsListItemContainer.defaultProps = {
  ...SettingsListItemContainer.defaultProps,
  className: '',
};





export { SettingsListItem };
export default SettingsListItemContainer;
