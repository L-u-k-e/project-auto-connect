import * as Ramda from 'ramda';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { themr } from 'react-css-themr';
import { deactivateSettingsAndHelpDialog } from 'redux/action-creators';
import { isSettingsAndHelpDialogActive } from 'redux/selectors';
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogButton
} from '@rmwc/dialog';
import { Typography } from '@rmwc/typography';
// import wrapWithFunctionChildComponent from 'view/libraries/wrap-with-function-child-component';
// import wrapWithComponent from 'view/libraries/wrap-with-component';
import baseTheme from './theme.css';





SettingsAndHelpDialog.propTypes = {
  // external
  className: PropTypes.string.isRequired,

  // provideTheme
  theme: PropTypes.object.isRequired,

  // controlDialogState
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
SettingsAndHelpDialog.defaultProps = {};
function SettingsAndHelpDialog(props) {
  const {
    theme,
    className,
    open,
    onClose,
  } = props;

  return (
    <Dialog
      className={classNames(className, theme.settingsAndHelpDialog)}
      open={open}
      onClose={onClose}
    >
      <DialogContent>
        <div className={theme.section}>
          <Typography use="headline5" className={theme.sectionHeading}>
            Settings
          </Typography>
          <Typography use="body">
            {'There\'s not currently any settings available for configuration, but we\'ll be adding some soon!'}
          </Typography>
        </div>
        <div className={theme.section}>
          <Typography use="headline5" className={theme.sectionHeading}>
            Help
          </Typography>
          <Typography use="body">
            {'For technical support, or any questions/ concerns regarding this application, you can email either Nick Orefice at nickjoref@gmail.com or Lucas Parzych at hi.lucas.p@gmail.com'}
          </Typography>
        </div>
        <div className={theme.section}>
          <Typography use="headline5" className={theme.sectionHeading}>
            Credits
          </Typography>
          <Typography use="body">
            <div className={theme.iconCredits}>
              Logo made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com </a> (licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0">CC 3.0 BY</a>)
            </div>
          </Typography>
        </div>
      </DialogContent>
      <DialogActions>
        <DialogButton action="close">Close</DialogButton>
      </DialogActions>
    </Dialog>
  );
}





const provideTheme = themr('SettingsAndHelpDialog', baseTheme);




const controlDialogState = connect(
  state => ({ open: isSettingsAndHelpDialogActive(state) }),
  { onClose: deactivateSettingsAndHelpDialog }
);





const SettingsAndHelpDialogContainer = (
  Ramda.compose(
    provideTheme,
    controlDialogState,
  )(SettingsAndHelpDialog)
);
SettingsAndHelpDialogContainer.displayName = 'SettingsAndHelpDialogContainer';
SettingsAndHelpDialogContainer.propTypes = {
  ...SettingsAndHelpDialogContainer.propTypes,
  className: PropTypes.string,
};
SettingsAndHelpDialogContainer.defaultProps = {
  ...SettingsAndHelpDialogContainer.defaultProps,
  className: '',
};





export { SettingsAndHelpDialog };
export default SettingsAndHelpDialogContainer;
