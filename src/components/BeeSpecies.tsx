import React from 'react';
import {IonButton, IonCard, IonCardContent, IonCol, IonGrid, IonRow, IonRouterLink} from '@ionic/react';

import "../pages/Default.css";

/* BeeSpecies - Template for the body of the DuringWalk page t
hat collects data during the walk 
              - Contains the specific bee species info 
*/
interface ContainerProps {   
}

const BeeSpecies: React.FC<ContainerProps> = () => {
  /*<input type="submit" value="Log In" id="submit"></input>*/
  return (   
    <>
        <IonCard className="card ">
            <IonCardContent className="nopadding">
                <IonGrid className="nopadding">
                    <IonRow>
                        <IonCol size="8" className="nopadding">
                            <img src="assets/images/bee.jpg"></img>
                        </IonCol>

                        <IonCol size="4">
                            <h1 className="ion-padding-start ion-padding-top">Bee Species name</h1>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonCardContent>
        </IonCard>      
    </>  
  );
};

export default BeeSpecies;
