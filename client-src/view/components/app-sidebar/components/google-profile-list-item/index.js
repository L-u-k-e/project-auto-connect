import * as Ramda from 'ramda';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { themr } from 'react-css-themr';
// import {  } from 'redux/action-creators';
import { getUserBasicProfile } from 'redux/selectors';
import {
  ListItem,
  ListItemText,
  ListItemGraphic,
  ListItemPrimaryText,
  ListItemSecondaryText
} from '@rmwc/list';
import { Avatar } from '@rmwc/avatar';
// import wrapWithFunctionChildComponent from 'view/libraries/wrap-with-function-child-component';
// import wrapWithComponent from 'view/libraries/wrap-with-component';
// import queueStates from '../../../../libraries/queue-states';
import baseTheme from './theme.css';





GoogleProfileListItem.propTypes = {
  // external
  className: PropTypes.string.isRequired,

  // provideUserBasicProfile
  googleBasicProfile: PropTypes.object.isRequired,

  // provideTheme
  theme: PropTypes.object.isRequired
};
GoogleProfileListItem.defaultProps = {
};
function GoogleProfileListItem(props) {
  const {
    theme,
    className,
    googleBasicProfile
  } = props;
  return (
    <ListItem className={classNames(className, theme.googleProfileListItem)} ripple={false}>
      <ListItemGraphic
        icon={
          <Avatar
            src={googleBasicProfile.getImageUrl()}
            size="xsmall"
            name={googleBasicProfile.getName()}
          />
        }
      />
      <ListItemText>
        <ListItemPrimaryText>
          {googleBasicProfile.getName()}
        </ListItemPrimaryText>
        <ListItemSecondaryText>
          {googleBasicProfile.getEmail()}
        </ListItemSecondaryText>
      </ListItemText>
    </ListItem>
  );
}





const provideTheme = themr('GoogleProfileListItem', baseTheme);





const providegoogleBasicProfile = connect(state => ({ googleBasicProfile: getUserBasicProfile(state) }));





const GoogleProfileListItemContainer = (
  Ramda.compose(
    provideTheme,
    providegoogleBasicProfile
  )(GoogleProfileListItem)
);
GoogleProfileListItemContainer.displayName = 'GoogleProfileListItemContainer';
GoogleProfileListItemContainer.propTypes = {
  ...GoogleProfileListItemContainer.propTypes,
  className: PropTypes.string,
};
GoogleProfileListItemContainer.defaultProps = {
  ...GoogleProfileListItemContainer.defaultProps,
  className: '',
};





export { GoogleProfileListItem };
export default GoogleProfileListItemContainer;
