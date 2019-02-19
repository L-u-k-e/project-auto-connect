import * as Ramda from 'ramda';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// import { connect } from 'react-redux';
import { themr } from 'react-css-themr';
// import {  } from 'redux/action-creators';
// import {  } from 'redux/selectors';
import { Button } from '@rmwc/button';
// import wrapWithFunctionChildComponent from 'view/libraries/wrap-with-function-child-component';
// import wrapWithComponent from 'view/libraries/wrap-with-component';
import baseTheme from './theme.css';





FileUploadButton.propTypes = {
  // external
  className: PropTypes.string.isRequired,
  inputProps: PropTypes.object.isRequired,
  buttonProps: PropTypes.object.isRequired,
  children: PropTypes.any.isRequired,

  // provideTheme
  theme: PropTypes.object.isRequired
};
FileUploadButton.defaultProps = {};
function FileUploadButton(props) {
  const {
    theme,
    className,
    inputProps,
    buttonProps,
    children
  } = props;

  return (
    <div className={classNames(className, theme.root)}>
      <Button {...buttonProps}>{children}</Button>
      <input {...inputProps} $ref={() => {}} type="file" style={{ display: 'none' }} />
    </div>
  );
}





const provideTheme = themr('FileUploadButton', baseTheme);





const FileUploadButtonContainer = (
  Ramda.compose(
    provideTheme,
    FileUploadButton,
  )(FileUploadButton)
);
FileUploadButtonContainer.displayName = 'FileUploadButtonContainer';
FileUploadButtonContainer.propTypes = {
  ...FileUploadButtonContainer.propTypes,
  className: PropTypes.string,
};
FileUploadButtonContainer.defaultProps = {
  ...FileUploadButtonContainer.defaultProps,
  className: '',
};





export { FileUploadButton };
export default FileUploadButtonContainer;
