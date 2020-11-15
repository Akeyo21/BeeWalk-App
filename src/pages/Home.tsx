import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonRouterOutlet } from '@ionic/react';
import React from 'react';

import './Home.css';
import HomePage from '../components/HomePage';
import Login from "../pages/Login";
import Register from "../pages/Register";
import {Route} from 'react-router-dom';
const Home: React.FC = () => {
  return (
    <><><IonRouterOutlet>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </IonRouterOutlet></>
      <IonPage>
        <IonHeader>
        </IonHeader>
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            
          </IonHeader>
          <HomePage />
        </IonContent>
      </IonPage></>
  );
};

export default Home;
