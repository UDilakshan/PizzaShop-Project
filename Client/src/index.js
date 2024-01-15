import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./index.css";
//import {BrowserRouter as Router} from 'react-router-dom'
import {AnimatePresence} from "framer-motion"
import { BrowserRouter as Router, redirect } from 'react-router-dom';
import { StateProvider } from './context/StateProvider';
import { initialState } from './context/initialState';
import reducer from './context/reducer';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
    <StateProvider initialState={initialState} reducer={reducer}>
      <AnimatePresence>
         <App />
      </AnimatePresence>
      </StateProvider>
    </Router>
  </React.StrictMode>
);

