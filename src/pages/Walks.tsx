import { IonContent, IonHeader, IonPage, IonRouterOutlet, IonList, IonItem, IonIcon, IonLabel, IonNote, IonListHeader } from '@ionic/react';
import React from 'react';

import './Default.css';
import WalkItem from '../components/WalkItem';
import Login from "../pages/Login";
import Walkdetail from "./Detail";
import {Route} from 'react-router-dom';
import { chevronForward } from 'ionicons/icons';
const Walks: React.FC = () => {
    console.log("walks File is opened");
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
          <div className="page">
          <IonList lines="full" className="list">
              <IonListHeader lines="full" color="dark" id="header">My Walks</IonListHeader>
                <IonItem className="item" href="/walkdetail" >  
                <IonLabel slot="start">
                    Transect Name
                </IonLabel>
                <IonNote slot="end" className="note">Date<br></br>time</IonNote>
                <IonIcon icon={chevronForward} slot="end"/>  
            </IonItem>
            
            
            <WalkItem link="/walkdetail"/>
            <WalkItem link="/walkdetail" />
            <WalkItem link="/walkdetail"/>
            <WalkItem link="/walkdetail"/>
            <WalkItem link="/walkdetail"/>
            <WalkItem link="/walkdetail"/>
          </IonList>
          
            
            
          
            </div>
          
        </IonContent>
      </IonPage></>
  );
};

export default Walks;
