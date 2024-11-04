import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import {
  HashRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import {BrowserView, MobileView} from 'react-device-detect';

import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
    <>
        <Header/>
        <Routes>
          <Route exact path="/" element={<App />} />
          
        </Routes>
        <Footer/>
    </>
    </Router>
  </StrictMode>,
)
