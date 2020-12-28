import React from 'react';
import '../components/ExploreContainer.css';
import { IonBackButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRouterOutlet, IonRow, IonToolbar } from '@ionic/react';

import './Default.css';
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
          <IonHeader >
          </IonHeader>
          <div className="container">
            
        <div className="wholepage "> 
        <IonBackButton defaultHref="/frontpage" icon="buttonIcon" text="BACK" className="ion-float-left" color="dark"/><br/>
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
