import * as Ramda from 'ramda';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { themr } from 'react-css-themr';
import { Button } from '@rmwc/button';
import { loadLeads } from 'redux/action-creators';
// import {  } from 'redux/selectors';
import wrapWithFunctionChildComponent from 'view/libraries/wrap-with-function-child-component';
// import wrapWithComponent from 'view/libraries/wrap-with-component';
import baseTheme from './theme.css';





LoadLeadsButton.propTypes = {
  // external
  className: PropTypes.string.isRequired,

  // provideTheme
  theme: PropTypes.object.isRequired,

  // provideOnClick
  onClick: PropTypes.func.isRequired,
};
LoadLeadsButton.defaultProps = {};
function LoadLeadsButton(props) {
  const {
    theme,
    className,
    onClick
  } = props;

  return (
    <Button className={classNames(className, theme.loadLeadsButton)} onClick={onClick}>
      Load Leads
    </Button>
  );
}





const provideTheme = themr('LoadLeadsButton', baseTheme);




const acceptedFileTypes = ['text/csv', 'application/vnd.ms-excel'];
class OnClickProvider extends React.Component {
  static propTypes = {
    loadLeads: PropTypes.func.isRequired,
    children: PropTypes.any.isRequired,
  };

  static defaultProps = {
  };

  fileInputRef = React.createRef()

  onFileChange = (event) => {
    const file = event.target.files[0];
    if (!acceptedFileTypes.includes(file.type)) return;
    this.props.loadLeads(file);
  }

  onClick = () => {
    this.fileInputRef.current.click();
  }

  render() {
    const { children } = this.props;
    return (
      <React.Fragment>
        <input
          type="file"
          style={{ display: 'none' }}
          ref={this.fileInputRef}
          onChange={this.onFileChange}
          accept={acceptedFileTypes.join(',')}
          multiple={false}
        />
        {children({ onClick: this.onClick })}
      </React.Fragment>
    );
  }
}
const OnClickProvider_Connected = connect(null, { loadLeads })(OnClickProvider);
const provideOnClick = wrapWithFunctionChildComponent(OnClickProvider_Connected);





const LoadLeadsButtonContainer = (
  Ramda.compose(
    provideTheme,
    provideOnClick,
  )(LoadLeadsButton)
);
LoadLeadsButtonContainer.displayName = 'LoadLeadsButtonContainer';
LoadLeadsButtonContainer.propTypes = {
  ...LoadLeadsButtonContainer.propTypes,
  className: PropTypes.string,
};
LoadLeadsButtonContainer.defaultProps = {
  ...LoadLeadsButtonContainer.defaultProps,
  className: '',
};





export { LoadLeadsButton };
export default LoadLeadsButtonContainer;
