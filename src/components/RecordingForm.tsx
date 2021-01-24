import React from 'react';
import './ExploreContainer.css';
import './LoginPage.css';
import {  IonList, IonItem,  IonInput, IonButton } from '@ionic/react';

interface ContainerProps { 
  
}

const RecordingForm: React.FC<ContainerProps> = () => {
  /*<input type="submit" value="Log In" id="submit"></input>*/
  return (   
<div className="page">
            <h1 className="division margin-bottom">Edit Record</h1>
            <form >
                <IonList>
                  <IonItem>
                    <IonInput className="dark" placeholder="Section(filled automatically)"></IonInput>
                  </IonItem>

                  <IonItem>
                    <IonInput placeholder="Species(filled automatically)"></IonInput>
                  </IonItem>

                  <IonItem>
                    <IonInput placeholder="Caste(filled automatically)"></IonInput>
                  </IonItem>

                  <IonItem>
                    <IonInput placeholder="Number(filled automatically)"></IonInput>
                  </IonItem>

                  <IonItem>
                    <IonInput placeholder="Flower" ></IonInput>
                  </IonItem>

                  </IonList>
                  
                  <IonButton color="warning" size="large"  shape="round" expand="block" className="margin-top">Take Photo/Video</IonButton>
                  <IonButton color="warning" size="large"  shape="round" expand="block" className="margin-top">Automatic ID</IonButton>
                  <IonButton color="warning" size="large"  shape="round" expand="block" className="margin-top" href="/start/duringwalk/map">Add Record</IonButton>
               
                  
            </form>
            
          
            </div>
    
  );
};

export default RecordingForm;
