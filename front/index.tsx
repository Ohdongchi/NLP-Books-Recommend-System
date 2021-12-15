// React Modules
import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { hot } from "react-hot-loader/root";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";

// Redux Modules
import { createStore, applyMiddleware, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./src/redux/reducer/RootReducer";

// App
import App from "./src/components/App";

// Saga
import createSagaMiddleWare from "redux-saga";
import rootSaga from "./src/redux/saga/RootSaga";

// Logger
import logger from "redux-logger";

const Hot = hot(App);
const sagaMiddleWare = createSagaMiddleWare();
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleWare))
);
sagaMiddleWare.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <CookiesProvider>
      <Router>
        <Hot />
      </Router>
    </CookiesProvider>
  </Provider>,
  document.querySelector(".root")
);
