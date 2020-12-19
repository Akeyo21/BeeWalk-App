import React from 'react';
import './ExploreContainer.css';
import {IonInput,IonButton, IonCard, IonCardContent, IonCol, IonGrid, IonRow} from '@ionic/react';
import './LoginPage.css';
import "../pages/Default.css";


interface ContainerProps { 
  
}

const BeesInArea: React.FC<ContainerProps> = () => {
  /*<input type="submit" value="Log In" id="submit"></input>*/
  return (   

       
        <IonCard className="card " >

        <IonCardContent className="nopadding">
        <IonGrid className="nopadding">
            <IonRow>
                <IonCol size="8" className="nopadding">
                    <img src="assets/images/bee.jpg"></img>
                </IonCol>

                <IonCol size="4">
                    <h3>Bee Species name</h3>
                </IonCol>
            </IonRow>
        </IonGrid>
        </IonCardContent>
        </IonCard>     
                       
        
    
  );
};

export default BeesInArea;
