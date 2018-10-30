import * as Ramda from 'ramda';
import * as actionTypes from 'redux/action-types';
import { leadsLoaded } from 'redux/action-creators';
import PapaCSVParser from 'papaparse';



const actionHandlers = {
  [actionTypes.LOAD_LEADS]: parseLeadsFile,
};





export default function leadsUploaderMiddleware(store) {
  return next => action => {
    if (actionHandlers[action.type]) {
      actionHandlers[action.type](store, action, next);
    } else {
      next(action);
    }
  };
}





function parseLeadsFile(store, action, next) {
  next(action);
  const file = action.payload;
  PapaCSVParser.parse(file, { complete: handleParseCompleted, header: true });

  function handleParseCompleted({ data, errors, meta }) {
    if (!Ramda.isEmpty(errors)) {
      console.error(errors);
    } else {
      next(leadsLoaded({ data, fieldNames: meta.fields }));
    }
  }
}
