import { IonContent, IonHeader, IonPage, IonRouterOutlet} from '@ionic/react';
import React from 'react';
import RegisterPage from '../components/RegisterPage';
import './Home.css';
import { IonReactRouter } from '@ionic/react-router';
import Terms from "./Terms&Conditions";
import Acknowledgment from "./Acknowledgment";
import {Route} from 'react-router-dom';

const Register: React.FC = () => {
  return (
    <><IonReactRouter>
      <IonRouterOutlet>
        <Route path="/terms" component={Terms} />
        <Route path="/acknowledgement" component={Acknowledgment} />
        
      </IonRouterOutlet>
    </IonReactRouter>
      <IonPage>
        <IonHeader>

        </IonHeader>
        <IonContent fullscreen>
          <IonHeader collapse="condense">

          </IonHeader>
          <RegisterPage />
        </IonContent>
      </IonPage></>
  );
};

export default Register;
