import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonRouterOutlet } from '@ionic/react';
import React from 'react';
import LoginPage from '../components/LoginPage';
import './Home.css';
import Postlogin from './Postlogin';

import {Route} from 'react-router-dom';
/*<Route path="/frontpage" component={Postlogin} />*/
const Login: React.FC = () => {
  return (
    <><><IonRouterOutlet>
      <Route path="/frontpage" component={Postlogin} />
      
    </IonRouterOutlet></>
      <IonPage>
        <IonHeader>

        </IonHeader>
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            
          </IonHeader>
          <LoginPage />
        </IonContent>
      </IonPage></>
  );
};

export default Login;
