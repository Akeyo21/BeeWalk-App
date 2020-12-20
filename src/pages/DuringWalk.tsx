import React from 'react';
/*import '../components/ExploreContainer.css';*/
import { IonButton,  IonCard,  IonCardContent,  IonCol,  IonContent, IonFooter, IonGrid, IonHeader, IonInput, IonPage, IonRouterLink, IonRouterOutlet, IonRow, IonSegment, IonSegmentButton, IonText, IonToolbar } from '@ionic/react';
/*import '../components/LoginPage.css';
import './PreWalk.css';*/
import './Default.css';
import DuringWalkHeader from '../components/DuringWalkHeader'
import Login from "./Login";
import Register from "./Register";
import {Route} from 'react-router-dom';
import BeeSpecies from '../components/BeeSpecies'
/*
    DuringWalk - page that collects data during walk
*/
interface ContainerProps { 
}

const DuringWalk: React.FC<ContainerProps> = (props) => {
  return (
    <><><IonRouterOutlet>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </IonRouterOutlet></>
      <IonPage>
        <IonHeader>
        </IonHeader>
        <IonContent fullscreen className="whitebackground ">
            <IonHeader collapse="condense" className="switch">
               <DuringWalkHeader/>                               
            </IonHeader>
            <div className="datacontent">
              
              <BeeSpecies/> 
              <BeeSpecies/> 
              <BeeSpecies/> 
              <BeeSpecies/> 
              <BeeSpecies/> 
              <BeeSpecies/> 

            </div>
            

        </IonContent>
      </IonPage></>
    
    
  );
};

export default DuringWalk;
