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
  const logVitals =
    process.env.NODE_ENV === 'development' ||
    process.env.REACT_APP_LOG_WEB_VITALS === 'true';

  if (logVitals) {
    // eslint-disable-next-line no-console -- intentional Web Vitals diagnostics
    console.log('[Web Vitals]', metric.name, {
      value: metric.value,
      delta: metric.delta,
      id: metric.id,
      rating: metric.rating,
      navigationType: metric.navigationType,
    });
  }

  if (typeof window.gtag === 'function') {
    const clsMultiplier = metric.name === 'CLS' ? 1000 : 1;
    window.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      value: Math.round(metric.delta * clsMultiplier),
      event_label: metric.id,
      non_interaction: true,
    });
  }
}

reportWebVitals(sendWebVital);
