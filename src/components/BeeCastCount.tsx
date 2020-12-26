import React, { useState } from 'react';
import { IonCol,  IonRow, IonFab, IonFabButton, IonIcon} from '@ionic/react';

import "../pages/Default.css";
import { add, removeOutline } from 'ionicons/icons';

/* BeeCastCount - Template for the body of the DuringWalk page 
that collects data during the walk 
              - Contains the counter of each bee cast 
*/
interface ContainerProps {  
    cast : string 
}

const BeeCastCount: React.FC<ContainerProps> = (props) => {
  return ( 
      <>  
                <IonRow>
                    <IonCol size="6">
                        <h1>{props.cast}</h1>
                    </IonCol>

                    <IonCol size="3">
                        <IonFab vertical="top" horizontal="end" >
                            <IonFabButton>
                                <IonIcon icon={add} />
                            </IonFabButton>                           
                        </IonFab>     
                    </IonCol>

                    <IonCol size="3">
                        <IonFab vertical="top" horizontal="end" >

                            <IonFabButton>                                
                                <IonIcon icon={removeOutline} />
                            </IonFabButton>                            
                        </IonFab>                        
                        
                    </IonCol>
                    
                </IonRow>
                
            </>
            );
    
        };
        
export default BeeCastCount;