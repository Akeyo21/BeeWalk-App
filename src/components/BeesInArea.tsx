import React from 'react';
import './ExploreContainer.css';
import {IonInput,IonButton, IonCard, IonCardContent, IonCol, IonGrid, IonRow} from '@ionic/react';
import './LoginPage.css';
import "../pages/Default.css";
import {allBees, Bee} from '../beeInfo/DifferentBeeSpecies';
interface ContainerProps { 
  name:String
}

const BeesInArea: React.FC<ContainerProps> = (props) => {
  /*<input type="submit" value="Log In" id="submit"></input>*/
  let currentBee:Bee|null= null
  for(let i=0;i<allBees.length;i++){
    if (props.name.toLowerCase()==allBees[i].common.toLowerCase()){
        currentBee = allBees[i]
    }
  }
  console.log(currentBee)
  return (   

       
        <IonCard className="card " >

        <IonCardContent className="nopadding">
        <IonGrid className="nopadding">
            <IonRow>
                {currentBee? 
                <>
                <IonCol size="8" className="nopadding">
                    <img src={currentBee.getImage()}></img>
                </IonCol>

                              <IonCol size="4">
                                  <h3>{currentBee.getCommon()}</h3>
                                  <h5 className="italics">{currentBee.getScientific()}</h5>
                              </IonCol></>: 
                              
                              <IonCol size="12">
                                  <h2>{props.name}</h2></IonCol>}
            </IonRow>
        </IonGrid>
        </IonCardContent>
        </IonCard>     
                       
        
    
  );
};

export default BeesInArea;
