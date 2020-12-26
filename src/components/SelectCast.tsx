import React from 'react';
import { IonCol,  IonRow, IonIcon, IonGrid, IonSelectOption, IonSelect} from '@ionic/react';

import "../pages/Default.css";
import {addCircle, removeCircle} from 'ionicons/icons';

/* Select Cast - Template for the body of the Manual Data 
page that allows user to enter data manually
if bee species is not found
              - Contains the counter of each bee cast 
*/
interface ContainerProps {  
    
}

const SelectCast: React.FC<ContainerProps> = () => {
  return ( 
    <>  
        <IonGrid>
            <IonRow >
                <IonCol size="6">                       
                    <IonSelect id="customPopoverSelect" interface="popover" placeholder="Bee cast">
                        <IonSelectOption value="queen">Queen</IonSelectOption>
                        <IonSelectOption value="worker">Worker</IonSelectOption>
                        <IonSelectOption value="unkwnown">Unknown</IonSelectOption>
                    </IonSelect>
                </IonCol>

                <IonCol size="3">
                    <IonIcon class="icons" size="large" icon={addCircle} />                               
                </IonCol>

                <IonCol size="3">
                    <IonIcon class="icons"  size="large"icon={removeCircle} />                               
                </IonCol>
                    
            </IonRow>
        </IonGrid>     
    </>
            );
    
        };
        
export default SelectCast;