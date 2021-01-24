import { IonContent, IonHeader, IonPage, IonRouterOutlet, IonList, IonItem, IonIcon, IonLabel, IonNote, IonListHeader, IonTabButton, IonTabBar, IonInput, IonButton } from '@ionic/react';
import React from 'react';

import './Default.css';
import RecordingForm from '../components/RecordingForm';
import Login from "../pages/Login";
import Walkdetail from "./Detail";
import {Route} from 'react-router-dom';
const RecordForm: React.FC = () => {
  return (
    <><><IonRouterOutlet>
      <Route path="/login" component={Login} />
      <Route path="/walkdetail" component={Walkdetail} />
    </IonRouterOutlet></>
      <IonPage >
        <IonHeader>
        </IonHeader>
        <IonContent fullscreen className="content">
          <IonHeader collapse="condense">            
          </IonHeader>
          <RecordingForm/>
          
        </IonContent>
      </IonPage></>
  );
};

export default RecordForm;
