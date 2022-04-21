import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {store} from "./redux/store";
import {Provider} from "react-redux";

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
}

