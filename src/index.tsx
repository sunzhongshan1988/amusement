import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import './i18n';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// Aliyun ARMS
// const BrowserLogger = require('alife-logger');
// let env = 'local';
// if (process.env.REACT_APP_ENV === 'prod') {
//   env = 'prod';
// } else if (process.env.REACT_APP_ENV === 'test') {
//   env = 'daily';
// }
// const __bl = BrowserLogger.singleton(
//   {
//     pid:"b5kj0213bn@1b9e550513e38ad",
//     appType:"web",
//     imgUrl:"https://arms-retcode.aliyuncs.com/r.png?",
//     sendResource:true,
//     enableLinkTrace:true,
//     behavior:true,
//     useFmp:true,
//     enableConsole:true,
//     environment: env,
//   }
// );
// window.addEventListener('error', function (ex) {
//   // 一般事件的参数中会包含pos信息。
//   // @ts-ignore
//   window.__bl && __bl.error(ex.error, ex);
// });
