import React from 'react';
import './ExploreContainer.css';
import '../pages/Default.css';
import {IonButton, IonCol, IonGrid, IonIcon, IonInput, IonRow, IonSelect, IonSelectOption} from '@ionic/react';
import './LoginPage.css'
import SelectCast from './SelectCast'
import { addCircle, removeCircle } from 'ionicons/icons';
interface ContainerProps { 
  
}

/*Form that is rendered when the manual adding of bee data
is selected*/
const ManualForm: React.FC<ContainerProps> = () => {
    
    return (   
        
        <div className="container">
            <div className="wholepage">
            <form id="manualform" action="/start/duringwalk">
                <IonInput placeholder="Bee Species" type="text" required className="input"></IonInput>
                <div id="cast">                    
                <SelectCast/>
                </div>
                <input type="submit" value="Add Bee Record" id="submit" ></input>
            </form>

            </div>

        </div>
        
    );
};

export default ManualForm;
