import * as Ramda from 'ramda';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { themr } from 'react-css-themr';
import baseTheme from './theme.css';





PropertyDisplay.propTypes = {
  // external
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  value: PropTypes.any,
  multiline: PropTypes.bool,

  // setTheme
  theme: PropTypes.object.isRequired
};
PropertyDisplay.defaultProps = {
  className: '',
  multiline: false,
  value: null
};
function PropertyDisplay(props) {
  const { label, value, multiline, theme, className } = props;
  return (
    <div className={classNames(className, theme.propertyDisplay, { [theme.multiline]: multiline })}>
      <div className={theme.label}>
        {label}
      </div>
      <div className={theme.value}>
        {value}
      </div>
    </div>
  );
}





const setTheme = themr('PropertyDisplay', baseTheme);





const PropertyDisplayContainer = (
  Ramda.compose(
    setTheme
  )(PropertyDisplay)
);
PropertyDisplayContainer.displayName = 'PropertyDisplayContainer';





export { PropertyDisplay };
export default PropertyDisplayContainer;
