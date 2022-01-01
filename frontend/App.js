import React from "react";

import { PersistGate } from "redux-persist/integration/react";
import { Provider as ReduxProvider } from "react-redux";
import store, { persistor } from "./redux/store";

import MainAppContent from "./components/MainAppContent";

function App() {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MainAppContent />
      </PersistGate>
    </ReduxProvider>
  );
}

export default App;
