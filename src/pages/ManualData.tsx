import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonRouterOutlet, IonInput } from '@ionic/react';
import React from 'react';
import LoginPage from '../components/LoginPage';
import './Home.css';
import Postlogin from './Postlogin';

import {Route} from 'react-router-dom';
const ManualData: React.FC = () => {
  return (
    <><><IonRouterOutlet>
      <Route path="/frontpage" component={Postlogin} />
      
    </IonRouterOutlet></>
      <IonPage>
        <IonContent fullscreen>
            <IonHeader collapse="condense">
                
            </IonHeader>
            <IonInput className="input" type="text"  required placeholder="Bee Species" font-weight="bold" placeholder-opacity="1"/>
            <IonInput className="input" type="number"  required placeholder="Bee cast number" font-weight="bold" placeholder-opacity="1"/>
        </IonContent>
      </IonPage></>
  );
};

export default ManualData;
