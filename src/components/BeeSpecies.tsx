import React, { useState } from 'react';
import {IonButton, IonCard, IonCardContent, IonCol, IonGrid, IonRow, IonRouterLink, IonModal, IonPicker, IonFab, IonFabButton, IonIcon, IonBackdrop, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel} from '@ionic/react';

import "../pages/Default.css";
import BeeCastCount from "./BeeCastCount"
import { add, removeOutline } from 'ionicons/icons';

/* BeeSpecies - Template for the body of the DuringWalk page t
hat collects data during the walk 
              - Contains the specific bee species info 
*/
interface ContainerProps {  
    content: string
    
}

const BeeSpecies: React.FC<ContainerProps> = (props) => {
    const [showModal, setShowModal] = useState(false);
    
    
  return (   
      
    <>
        <IonModal isOpen={showModal} cssClass='modal' showBackdrop backdrop-dismiss={false}>
            
            <h1>Bee Species Name</h1>
            
            <IonGrid className="grid">
                <BeeCastCount cast="Queen"/>
                <BeeCastCount cast="Worker"/>
                <BeeCastCount cast="Unknown"/>
            </IonGrid>

            <IonGrid>
                <IonRow>
                    <IonCol size="6">
                        <IonButton onClick={() => setShowModal(false)} color="dark">Add Record</IonButton>
                    </IonCol>

                    <IonCol size="4">
                        <IonButton onClick={() => setShowModal(false)} color="dark" className="left-margin">Cancel</IonButton>
                    </IonCol>
                </IonRow>
            </IonGrid>
            
            
        </IonModal>
        <IonItemSliding>
            <IonItem className="nopadding nomargin">
                <IonCard className="card " onClick={() => setShowModal(true)}>
                    <IonCardContent className="nopadding">
                        <IonGrid className="nopadding">
                            <IonRow>
                                <IonCol size="8" className="nopadding">
                                    <img src="assets/images/bee.jpg"></img>
                                </IonCol>

                                <IonCol size="4">
                                    <h1 className="ion-padding-start ion-padding-top">{props.content}</h1>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonCardContent>
                </IonCard>      
            </IonItem>

            <IonItemOptions side="end">
            <IonItemOption color="warning" expandable>
                    <h3>Bee Cast Info</h3>
                </IonItemOption>
            </IonItemOptions>
    </IonItemSliding>
    </>  
  );
    
};

export default BeeSpecies;
