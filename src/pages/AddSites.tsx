import React from 'react';
import '../components/ExploreContainer.css';
import '../pages/Default.css';
import {IonContent, IonInput} from '@ionic/react';

interface ContainerProps { 
  
}

/*Form that is rendered when the manual adding of bee data
is selected*/
const AddSites: React.FC<ContainerProps> = () => {
    
    return (   
        
        <IonContent fullscreen className="content">
             <form id="manualform" action="/mysites">
                <IonInput placeholder="Transect Name" type="text" required className="input"></IonInput>
                
                <IonInput placeholder="County" type="text" required className="input"/>
                
                <IonInput placeholder="Number of Sections" type="number" required className="input"/>
                <IonInput placeholder="Overall length (m)" type="number"  className="input"/>
                
                <IonInput placeholder="Year established" type="number"  className="input"/>
                <input type="submit" value="Save" id="submit" ></input>
            </form>

        </IonContent>
           
    );
};

export default AddSites;
