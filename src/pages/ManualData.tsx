import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonRouterOutlet, IonInput } from '@ionic/react';
import React from 'react';
import ManualForm from '../components/ManualForm';
import './Home.css';
import Postlogin from './Home';

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
            <ManualForm/>
            </IonContent>
      </IonPage></>
  );
};

export default ManualData;
