import React from 'react';
import {IonApp, IonRouterOutlet, setupIonicReact} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Home from './pages/Home';
import Lucky from './pages/lucky/Lucky';

// Global styles
import './global.scss';
import {checkParamsAndAuth, ConfigEnvDiff} from './service/utils';
import WXAuth from './pages/auth/WXAuth';
import Fault404Page from './pages/faults/404';
import {AuthProvider} from './hooks/useAuth';

const {REACT_APP_SUB_PATH} = process.env;

setupIonicReact({
    mode: 'md',
});

ConfigEnvDiff({
    writeUserInfo: ['dev'],
    activeConsole: ['dev', 'test'],
});
checkParamsAndAuth();


const App: React.FC = () => (
  <IonApp>
    <AuthProvider>
        <IonReactRouter  basename={REACT_APP_SUB_PATH}>
          <IonRouterOutlet>
            <Route exact path="/home">
              <Home />
            </Route>
            <Route exact path="/auth">
              <WXAuth />
            </Route>
            <Route exact path="/404">
              <Fault404Page />
            </Route>
            <Route exact path="/lucky">
              <Lucky />
            </Route>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
          </IonRouterOutlet>
        </IonReactRouter>
    </AuthProvider>
  </IonApp>
);

export default App;
