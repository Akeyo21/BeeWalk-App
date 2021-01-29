import React, { useContext } from 'react';
import './ExploreContainer.css';
import './LoginPage.css';
import '../pages/Default.css';
import {  IonList, IonItem,  IonInput, IonButton, IonText, IonLabel } from '@ionic/react';
import { Context } from '../pages/RecordForm';
import { BeeSpecies } from '../Reducers/SpeciesReducer';

interface ContainerProps { 
  species: BeeSpecies
}

const Form: React.FC<ContainerProps> = (props) => {
  
  return (   
<div className="page">
            <h1 className="division margin-bottom">Edit Record</h1>
            <form >
                <IonList>
                  <IonItem>
                    <IonInput className="placeholder" placeholder="Section(filled automatically)"></IonInput>
                  </IonItem>

                  <IonItem href="/start/duringwalk" className="text-center" >
                    {props.species? <IonLabel >{props.species.getName()}</IonLabel>:<IonLabel >Species</IonLabel>}                   
                  </IonItem>

                  {props.species? 
                  props.species.getCaste().map((casteobject)=>(
                    <><IonItem className="text-center"> 
                      <IonLabel >
                        {Object.keys(casteobject)[0]}: {Object.values(casteobject)[0]}
                      </IonLabel> 
                    </IonItem> </>
                    ))
                   
                    :

                  <><IonItem>
                    <IonInput className="placeholder" placeholder="Caste"></IonInput>
                  </IonItem>

                    <IonItem>
                      <IonInput className="placeholder" placeholder="Number(filled automatically)"></IonInput>
                    </IonItem></>}

                  <IonItem>
                    <IonInput  className="placeholder" placeholder="Flower (optional)" ></IonInput>
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
