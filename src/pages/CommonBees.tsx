import React from 'react';
import '../components/ExploreContainer.css';
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRouterOutlet, IonRow } from '@ionic/react';

import './Default.css';
import HomePage from '../components/HomePage';
import Login from "../pages/Login";
import Register from "../pages/Register";
import BeesInArea from '../components/BeesInArea';
import PreWalk from "../pages/PreWalk";
import {Route} from 'react-router-dom';

interface ContainerProps { 
}
/* CommonBees - page that shows the common bees in the are
*/
const CommonBees: React.FC<ContainerProps> = (props) => {
  return (
    <><><IonRouterOutlet>
      <Route path="/start/prewalk" component={PreWalk} />
    </IonRouterOutlet></>
      <IonPage>
        <IonHeader>
        </IonHeader>
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            
          </IonHeader>
          <div className="container">
        <div className="wholepage"> 
          <BeesInArea />
          <BeesInArea />
          <BeesInArea />
          <BeesInArea />
          <BeesInArea />
            <BeesInArea />
        </div>
        </div>
          
          
        </IonContent>
      </IonPage></>
    
    
  );
};

export default CommonBees;
