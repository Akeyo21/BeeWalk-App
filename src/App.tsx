import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Terms from "./pages/Terms&Conditions";
import Acknowledgment from "./pages/Acknowledgment";
import Postlogin from './pages/Postlogin';
import Walks from './pages/Walks';
import Walkdetail from './pages/Detail';
import CommonBees from './pages/CommonBees';
import PreWalk from './pages/PreWalk';
import DuringWalk from './pages/DuringWalk';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { walk, ellipsisHorizontal, leaf, navigate, home } from 'ionicons/icons';
/*<Route path="/frontpage" component={Postlogin} />*/
const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/home" component={Home} exact={true} />
        <Route exact path="/" render={() => <Redirect to="/home" />} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/terms" component={Terms} />
        <Route path="/acknowledgement" component={Acknowledgment} />
        <Route path="/frontpage" component={Postlogin} />
        <Route path="/walks" component={Walks} />
        <Route path="/walkdetail" component={Walkdetail} />
        <Route path="/commonbees" component={CommonBees} />
        <Route path="/start/prewalk" component={PreWalk} />
        <Route path="/start/duringwalk" component={DuringWalk} />
     
     
      </IonRouterOutlet>

      
      <IonTabBar slot="bottom" color="warning">
      <IonTabButton tab="home" href="/frontpage">
          <IonIcon icon={home} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>

        <IonTabButton tab="walks" href="/walks">
          <IonIcon icon={walk} />
          <IonLabel>My walks</IonLabel>
        </IonTabButton>
        
        <IonTabButton tab="register" href="/register">
          <IonIcon icon={leaf} />
          <IonLabel>My Sites</IonLabel>
        </IonTabButton>
        
        <IonTabButton tab="terms" href="/terms">
          <IonIcon icon={navigate} />
          <IonLabel>Explore</IonLabel>
        </IonTabButton>
        
        <IonTabButton tab="terms" href="/terms">
          <IonIcon icon={ellipsisHorizontal} />
          <IonLabel>More</IonLabel>
        </IonTabButton>
      </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
