import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ParallaxProvider } from 'react-scroll-parallax';
import ScrollToTop from './components/ScrollToTop.jsx';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  
    <BrowserRouter>
      <ParallaxProvider>
      <ScrollToTop />
        <App />
      </ParallaxProvider>
    </BrowserRouter>
    
  </React.StrictMode>
);

