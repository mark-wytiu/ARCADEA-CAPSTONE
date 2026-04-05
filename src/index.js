import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

function sendWebVital(metric) {
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console -- intentional dev-only Web Vitals output
    console.log('[Web Vitals]', metric.name, metric);
  }

  if (typeof window.gtag === 'function') {
    window.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      value: Math.round(metric.name === 'CLS' ? metric.delta * 1000 : metric.delta),
      event_label: metric.id,
      non_interaction: true,
    });
  }
}

reportWebVitals(sendWebVital);
