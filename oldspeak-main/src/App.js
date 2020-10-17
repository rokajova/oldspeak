import * as React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { getReduxStore, getRrfProp } from "./Config/firebase-redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import RouterManager from "./Component/RouterManager/RouterManager";

function App() {
  return (
    <div className="App">
      {/* enableLoggin issue provider or ReactReduxFirebaseProvider */}
      <Provider store={getReduxStore()}>
        <ReactReduxFirebaseProvider {...getRrfProp()}>
          <Router>
            <RouterManager />
          </Router>
        </ReactReduxFirebaseProvider>
      </Provider>
    </div>
  );
}

export default App;
