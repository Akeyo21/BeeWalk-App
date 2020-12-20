import React from 'react';
/*import '../components/ExploreContainer.css';*/
import { IonButton,  IonCard,  IonCardContent,  IonCol,  IonContent, IonFooter, IonGrid, IonHeader, IonInput, IonPage, IonRouterLink, IonRouterOutlet, IonRow, IonSegment, IonSegmentButton, IonText, IonToolbar } from '@ionic/react';
/*import '../components/LoginPage.css';
import './PreWalk.css';*/
import './Default.css';
import DuringWalkHeader from '../components/DuringWalkHeader'

import ManualData from "./ManualData";
import {Route} from 'react-router-dom';
import BeeSpecies from '../components/BeeSpecies'

/*
    DuringWalk - page that collects data during walk
*/
interface ContainerProps { 
}

const DuringWalk: React.FC<ContainerProps> = () => {
  return (
    <><><IonRouterOutlet>
      <Route path="/start/duringwalk/manual" component={ManualData} />
    </IonRouterOutlet></>
      <IonPage>
        <IonHeader>
        </IonHeader>
        <IonContent fullscreen className="whitebackground ">
            <IonHeader collapse="condense" className= "switch">
               <DuringWalkHeader/>                               
            </IonHeader>
            <div className="datacontent" id="main">              
              <BeeSpecies content="Bee Species Name" /> 
              <BeeSpecies content="Bee Species Name"/> 
              <BeeSpecies content="Bee Species Name"/> 
              <BeeSpecies content="Bee Species Name"/> 
              <BeeSpecies content="Bee Species Name"/> 
              <BeeSpecies  content="Bee Species Name"/> 

            </div>
            

        </IonContent>
      </IonPage></>
    
    
  );
};

export default DuringWalk;
