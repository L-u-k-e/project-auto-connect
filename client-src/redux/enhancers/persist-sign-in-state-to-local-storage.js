import * as Ramda from 'ramda';
import persistState from 'redux-localstorage';





const enhancer = persistState(
  'signInStatus',
  {
    key: 'sign-in-status',
    slicer: (
      signInStatusPath => Ramda.pipe(
        Ramda.pick([signInStatusPath]),
        Ramda.evolve({
          [signInStatusPath]: Ramda.omit(['signInInProgress'])
        })
      )
    )
  }
);





export default enhancer;
