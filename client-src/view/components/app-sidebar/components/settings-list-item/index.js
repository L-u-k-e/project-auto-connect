import * as Ramda from 'ramda';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { themr } from 'react-css-themr';
// import {  } from 'redux/action-creators';
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
  theme: PropTypes.object.isRequired
};
SettingsListItem.defaultProps = {};
function SettingsListItem(props) {
  const {
    theme,
    className,
  } = props;

  return (
    <ListItem className={classNames(className, theme.settingsListItem)} ripple>
      <ListItemGraphic icon="settings" />
      <ListItemText>
        <ListItemPrimaryText> Settings  </ListItemPrimaryText>
        <ListItemSecondaryText> and help, credits, etc </ListItemSecondaryText>
      </ListItemText>
    </ListItem>
  );
}





const provideTheme = themr('SettingsListItem', baseTheme);





const SettingsListItemContainer = (
  Ramda.compose(
    provideTheme,
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
