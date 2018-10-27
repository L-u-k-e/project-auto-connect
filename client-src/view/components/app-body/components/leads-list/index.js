import * as Ramda from 'ramda';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { themr } from 'react-css-themr';

import {
  DataTable,
  DataTableContent,
  DataTableHead,
  DataTableBody,
  DataTableHeadCell,
  DataTableRow,
  DataTableCell
} from 'rmwc/DataTable';
// import {  } from 'redux/action-creators';
import { getLeads, getLeadsListFieldNames } from 'redux/selectors';
import { Card, } from 'rmwc/Card';
// import wrapWithFunctionChildComponent from 'view/libraries/wrap-with-function-child-component';
// import wrapWithComponent from 'view/libraries/wrap-with-component';
import baseTheme from './theme.css';





LeadsList.propTypes = {
  // external
  className: PropTypes.string.isRequired,

  // provideTheme
  theme: PropTypes.object.isRequired,

  // provideLeadsInfo
  leads: PropTypes.array,
  leadsListFieldNames: PropTypes.array,
};
LeadsList.defaultProps = {
  leads: [],
  leadsListFieldNames: [],
};
function LeadsList(props) {
  const {
    theme,
    className,
    leads,
    leadsListFieldNames,
  } = props;
  console.log(leads, leadsListFieldNames);
  return (
    <Card className={classNames(className, theme.leadsList)}>
      <DataTable stickyRows={1} className={theme.leadsTable}>
        <DataTableContent>
          <DataTableHead>
            <DataTableRow>
              {leadsListFieldNames.map(fieldName => (
                <DataTableHeadCell key={fieldName} alignStart>
                  {fieldName}
                </DataTableHeadCell>
              ))}
            </DataTableRow>
          </DataTableHead>
          <DataTableBody>
            {leads.map((lead, i) => (
              <DataTableRow key={i}>
                {leadsListFieldNames.map(fieldName => (
                  <DataTableCell key={fieldName} alignStart>
                    {lead[fieldName]}
                  </DataTableCell>
                ))}
              </DataTableRow>
            ))}
          </DataTableBody>
        </DataTableContent>
      </DataTable>
    </Card>
  );
}





const provideTheme = themr('LeadsList', baseTheme);





const provideLeadsInfo = connect(
  state => ({
    leads: getLeads(state),
    leadsListFieldNames: getLeadsListFieldNames(state)
  })
);





const LeadsListContainer = (
  Ramda.compose(
    provideTheme,
    provideLeadsInfo
  )(LeadsList)
);
LeadsListContainer.displayName = 'LeadsListContainer';
LeadsListContainer.propTypes = {
  ...LeadsListContainer.propTypes,
  className: PropTypes.string,
};
LeadsListContainer.defaultProps = {
  ...LeadsListContainer.defaultProps,
  className: '',
};





export { LeadsList };
export default LeadsListContainer;