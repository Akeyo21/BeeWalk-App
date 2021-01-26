import React from 'react';
import './ExploreContainer.css';
import './LoginPage.css';
import '../pages/Default.css';
import {  IonList, IonItem,  IonInput, IonButton, IonText, IonLabel } from '@ionic/react';

interface ContainerProps { 
  
}

const Form: React.FC<ContainerProps> = () => {
  /*<input type="submit" value="Log In" id="submit"></input>*/
  return (   
<div className="page">
            <h1 className="division margin-bottom">Edit Record</h1>
            <form >
                <IonList>
                  <IonItem>
                    <IonInput className="placeholder" placeholder="Section(filled automatically)"></IonInput>
                  </IonItem>

                  <IonItem href="/start/duringwalk" className="text-center">
                    <IonLabel >Species</IonLabel>                   
                  </IonItem>

                  <IonItem>
                    <IonInput className="placeholder" placeholder="Caste(filled automatically)"></IonInput>
                  </IonItem>

                  <IonItem>
                    <IonInput className="placeholder" placeholder="Number(filled automatically)"></IonInput>
                  </IonItem>

                  <IonItem>
                    <IonInput  className="placeholder" placeholder="Flower" ></IonInput>
                  </IonItem>

                  </IonList>
                  
                  <IonButton color="warning" size="large"  shape="round" expand="block" className="margin-top">Take Photo/Video</IonButton>
                  <IonButton color="warning" size="large"  shape="round" expand="block" className="margin-top">Automatic ID</IonButton>
                  <IonButton color="warning" size="large"  shape="round" expand="block" className="margin-top" href="/start/duringwalk/map">Add Record</IonButton>
               
                  
            </form>
            
          
            </div>
    
  );
};

export default Form;
