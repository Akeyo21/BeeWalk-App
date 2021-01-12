import React, { useState } from 'react';
import {IonButton, IonCard, IonCardContent, IonCol, IonGrid, IonRow, IonRouterLink, IonModal, IonPicker, IonFab, IonFabButton, IonIcon, IonBackdrop, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel} from '@ionic/react';

import "../pages/Default.css";
import { add, addCircle, removeCircle, removeOutline } from 'ionicons/icons';

/* BeeSpecies - Template for the body of the DuringWalk page t
hat collects data during the walk 
              - Contains the specific bee species info 
*/
interface ContainerProps {  
    /*Values in bee species class*/
    name: string
    queen: number;
    worker: number;
    unknown: number;
    
}

const BeeRecords: React.FC<ContainerProps> = (props) => {
    const [showModal, setShowModal] = useState(false);
  return (   
      
    <>
        <IonModal isOpen={showModal} cssClass='modal' showBackdrop backdrop-dismiss={false}>
            
            <h1>Bee Species Name</h1>
            
            <IonGrid className="grid">
                <BeeCastCount cast="Queen" number={props.queen}/>
                <BeeCastCount cast="Worker"  number={props.worker}/>
                <BeeCastCount cast="Unknown"  number={props.unknown}/>
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
                                    <h1 className="ion-padding-start ion-padding-top">{props.name}</h1>
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

export default BeeRecords;

/* BeeCastCount - Template for the body of the DuringWalk page 
that collects data during the walk 
              - Contains the counter of each bee cast 
*/


const BeeCastCount = (props:any) => {

    
    const changeNumber=(idPos: any, redOrAdd: String)=>{
        var currentNumber = document.getElementsByClassName("number")[idPos];
        var content = currentNumber?.textContent
        
        var newNumber = parseInt(String(content))
        var string = ''
        if (redOrAdd =="reduce")
            
            string = (newNumber-=1).toString()
        else
            string = (newNumber+=1).toString()
        if (parseInt(string)<0) string="0"
        if (currentNumber) currentNumber.innerHTML = string
    }
    const addNumber=()=>{
        if (props.cast == "Queen") changeNumber(0, "add")
        else if (props.cast == "Worker") changeNumber(1, "add")
        else if (props.cast == "Unknown") changeNumber(2, "add")
    }
    const reduceNumber=()=>{
        if(props.cast == "Queen") changeNumber(0, "reduce")
        else if (props.cast == "Worker") changeNumber(1, "reduce")
        else if (props.cast == "Unknown") changeNumber(2, "reduce")
    }
  return ( 
      <>  
                <IonRow>
                    <IonCol size="7">
                        <h1 id="specialh1">{props.cast}</h1>
                    </IonCol>

                    <IonCol size="2">
                        <IonIcon icon={addCircle} size="large" onClick={() => addNumber()}/>
                    </IonCol>

                    <IonCol size="1">
                        <h1 className="number">{props.number}</h1>
                    </IonCol>
 
                    <IonCol size="2">
                        <IonIcon icon={removeCircle} size="large" onClick={() => reduceNumber()}/>
                    </IonCol>
                    
                </IonRow>
                
            </>
            );
    
        };
        