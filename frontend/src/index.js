import React from 'react';
import ReactDOM from 'react-dom';
import {HelmetProvider} from "react-helmet-async"

import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css';
import App from './App';
import { StoreProvider } from './Store';


ReactDOM.render(
  <StoreProvider>

  <HelmetProvider>
    <App />
  </HelmetProvider>
  </StoreProvider>
    
 ,
  document.getElementById('root')
);

