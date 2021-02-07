import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp,  IonRouterOutlet } from '@ionic/react';
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
import ManualData from './pages/ManualData';
import MySites from './pages/MySites';
import AddSites from './pages/AddSites';
import More from './pages/More';
import MapWalk from './pages/MapWalk';
import RecordForm from './pages/RecordForm';
import Photo from './pages/Photo';
import Records from './pages/RecordsEntered';

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
const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
    
      <IonRouterOutlet>
        <Route path="/home" component={Home} exact={true} />
        <Route exact path="/" render={() => <Redirect to="/home" />} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/terms" component={Terms} />
        <Route path="/acknowledgement" component={Acknowledgment} />
        <Route path="/frontpage" component={Postlogin} />
        <Route path="/walks" component={Walks} />
        <Route path="/walkdetail/:id" component={Walkdetail} />
        <Route path="/commonbees" component={CommonBees} />
        <Route path="/mysites" component={MySites} />
        <Route path="/mysites/add" component={AddSites} />
        <Route path="/start/prewalk" component={PreWalk} />
        <Route path="/start/duringwalk" component={DuringWalk} />
        <Route path="/start/duringwalk/manual" component={ManualData} />
        <Route path="/map" component={MapWalk} />
        <Route path="/start/recordform" component={RecordForm} />
        <Route path="/start/photo" component={Photo} />
        <Route path="/start/records" component={Records} />

        <Route path="/more" component={More} />
     
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
