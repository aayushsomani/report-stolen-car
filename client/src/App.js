import React from 'react';
import './App.css';
import AppNavBar from "./components/AppNavBar/AppNavBar"
import { Provider } from 'react-redux';
import store from "./store";
import HomePage from "./components/HomePage/HomePage";
function App() {
  return (
    <Provider store={store}>
      <AppNavBar />
      <HomePage />
    </Provider>
  );
}

export default App;
