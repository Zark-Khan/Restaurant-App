import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { StateProvider } from './Context/StateProvider';
import { Initialstate } from './Context/Initialstate';
import Reducer from './Context/Reducer';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
    <StateProvider initialstate={Initialstate} Reducer={Reducer}>
    <App />
    </StateProvider>  
    </Router>,
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
