import React, { useContext, useState } from 'react';
import {IonButton, IonCard, IonCardContent, IonCol, IonGrid, IonRow, IonRouterLink, IonModal, IonPicker, IonFab, IonFabButton, IonIcon, IonBackdrop, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel} from '@ionic/react';

import "../pages/Default.css";
import BeeCastCount from "./BeeCastCount"
import { add, addCircle, removeCircle, removeOutline } from 'ionicons/icons';
import { Context } from '../pages/DuringWalk';
import { State } from 'ionicons/dist/types/stencil-public-runtime';

/* BeeSpecies - Template for the body of the DuringWalk page t
hat collects data during the walk 
              - Contains the specific bee species info 
*/
interface ContainerProps {  
    content: string
    
}

const BeeSpeciesFile: React.FC<ContainerProps> = (props) => {
    const [showModal, setShowModal] = useState(false);
    const {beedata, addBeeData} = useContext(Context);
    class BeeSpecies{
        name: String;
        queen: number;
        worker: number;
        unknown: number;
        constructor(name: String, queen: number, worker: number, unknown:number){
            this.name = name;
            this.queen = queen;
            this.worker = worker;
            this.unknown = unknown;
        }
    }
    function addBeeDataToList(){
       
        setShowModal(false)
        var queenvalue = document.getElementsByClassName("number")[0].textContent
        var workervalue = document.getElementsByClassName("number")[1].textContent
        var unknownvalue = document.getElementsByClassName("number")[2].textContent

        if (queenvalue && workervalue && unknownvalue ){
            let beeEntered = new BeeSpecies(props.content, parseInt(queenvalue),
            parseInt(workervalue), parseInt(unknownvalue))
            /*beedatalist.push(beeEntered)*/
            var beedatalist: BeeSpecies[] = beedata.push(beeEntered)
            /*console.log(beedatalist)*/
            addBeeData(beedatalist)
            
        }
    }
    console.log(beedata.length)
  return (   
      
    <>
        <IonModal isOpen={showModal} cssClass='modal' showBackdrop backdrop-dismiss={false}>
            
            <h1>{props.content}</h1>
            
            <IonGrid className="grid">
                <BeeCastCount cast="Queen"/>
                <BeeCastCount cast="Worker"/>
                <BeeCastCount cast="Unknown"/>
            </IonGrid>

            <IonGrid>
                <IonRow>
                    <IonCol size="6">
                        <IonButton onClick={() => addBeeDataToList()} color="dark">Add Record</IonButton>
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
export default BeeSpeciesFile;
