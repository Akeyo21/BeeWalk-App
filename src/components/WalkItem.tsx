import React from 'react';
import './ExploreContainer.css';
import {IonButton, IonIcon, IonItem, IonLabel, IonNote} from '@ionic/react';
import { chevronForwardOutline } from 'ionicons/icons';


interface ContainerProps { 
  link: string;
}

const WalkItem: React.FC<ContainerProps> = (props) => {
  return (
    

    <IonItem className="item" href={props.link} >                
    <IonLabel slot="start" >
        Botanical Gardens
    </IonLabel>
    <IonNote slot="end" >10/02/2020<br></br>11am - 12pm</IonNote>
    <IonIcon  icon={chevronForwardOutline} slot="end"/>                  
  </IonItem>
    
  );
};

export default WalkItem;
