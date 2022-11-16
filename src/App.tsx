
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Home from './pages/Home';
import Lucky from './pages/lucky/Lucky';

// Global styles
import './global.scss';

const {REACT_APP_SUB_PATH} = process.env;

setupIonicReact({
    mode: 'md',
});

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter  basename={REACT_APP_SUB_PATH}>
      <IonRouterOutlet>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/lucky">
            <Lucky />
        </Route>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
