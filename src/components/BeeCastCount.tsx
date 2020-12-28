import React, { useState } from 'react';
import { IonCol,  IonRow, IonFab, IonFabButton, IonIcon} from '@ionic/react';

import "../pages/Default.css";
import { add, addCircle, removeCircle, removeOutline } from 'ionicons/icons';

/* BeeCastCount - Template for the body of the DuringWalk page 
that collects data during the walk 
              - Contains the counter of each bee cast 
*/
interface ContainerProps {  
    cast : string 
}

const BeeCastCount: React.FC<ContainerProps> = (props) => {

    
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
                        <h1 className="number">0</h1>
                    </IonCol>
 
                    <IonCol size="2">
                        <IonIcon icon={removeCircle} size="large" onClick={() => reduceNumber()}/>
                    </IonCol>
                    
                </IonRow>
                
            </>
            );
    
        };
        
export default BeeCastCount;