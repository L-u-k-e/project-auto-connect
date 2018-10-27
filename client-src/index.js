import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import { RMWCProvider } from 'rmwc/Provider';
import configureStore from 'redux/store/index';
import appRootDomElement from 'libraries/app-root-dom-element';
import View from './view';

const store = configureStore();

const render = Component => {
  ReactDOM.render(
    (
      <AppContainer>
        <Provider store={store}>
          <RMWCProvider
            iconStrategy="ligature"
          >
            <Component />
          </RMWCProvider>
        </Provider>
      </AppContainer>
    ),
    appRootDomElement
  );
};

render(View);
if (module.hot) module.hot.accept('./view', () => render(View));
