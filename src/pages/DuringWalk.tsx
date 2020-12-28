import React, { useState } from 'react';
/*import '../components/ExploreContainer.css';*/
import { IonAlert, IonButton,  IonCard,  IonCardContent,  IonCol,  IonContent, IonFooter, IonGrid, IonHeader, IonInput, IonPage, IonRouterLink, IonRouterOutlet, IonRow, IonSegment, IonSegmentButton, IonText, IonToolbar } from '@ionic/react';
/*import '../components/LoginPage.css';
import './PreWalk.css';*/
import './Default.css';
import DuringWalkHeader from '../components/DuringWalkHeader'

import '../theme/variables.css';
import ManualData from "./ManualData";
import {Redirect, Route} from 'react-router-dom';
import BeeSpecies from '../components/BeeSpecies'
import ReactDOM from 'react-dom';
import Postlogin from './Postlogin';

/*
    DuringWalk - page that collects data during walk
*/
interface ContainerProps { 
}

const DuringWalk: React.FC<ContainerProps> = () => {
  const RepeatSpecies: React.FC<ContainerProps> = () => {
    return(
      <><BeeSpecies content="Bee Species Name"/>
        <BeeSpecies content="Bee Species Name" />
        <BeeSpecies content="Bee Species Name"/>
        <BeeSpecies content="Bee Species Name"/></> 
    )
  };

  const RepeatRecords: React.FC<ContainerProps> = () => {
    return(
      <><BeeSpecies content="Bee Records"/>
        <BeeSpecies content="Bee Records" />
        <BeeSpecies content="Bee Records"/>
        <BeeSpecies content="Bee Records"/></> 
    )
  };
  const showRecords=(truth: boolean)=>{
    console.log("Entered loop")
    console.log(truth + "truth value")
      var body = document.getElementById("main")
      if (truth){
        ReactDOM.render(
          <RepeatSpecies/> , body)
      }else{
        ReactDOM.render(
          <RepeatRecords/> , body)
      }     
  }
  const [showAlert1, setShowAlert1] = useState(false);

  const done= () =>{
    return(
    <><><IonRouterOutlet>
        <Route path="/frontpage" component={Postlogin} />

      </IonRouterOutlet></>
        <Redirect to="/frontpage"></Redirect></>
    )
  }
  return (
    <><></><><IonRouterOutlet>
      <Route path="/start/duringwalk/manual" component={ManualData} />
    </IonRouterOutlet></>
      <IonPage>
          <IonContent fullscreen className="whitebackground ">
            <IonHeader className="switch">
              <IonButton color="light" href="/start/duringwalk/manual">
                Add Manually
              </IonButton>

              <IonButton onClick={() => setShowAlert1(true)} className="whitebackground ion-float-right">
                Submit
              </IonButton>
              <IonAlert
                isOpen={showAlert1}
                onDidDismiss={() => setShowAlert1(false)}
                cssClass='submitalert'
                header={'Submission'}
                message={'Do you wish to submit your data?'}
                buttons={[
                  {
                    text: 'OK',
                  },

                  {
                    text: 'Cancel',
                    role: 'cancel'
                  }
                ]} />

              <IonToolbar className="toolbar">
                <IonSegment value="all">
                  <IonSegmentButton value="all" onClick={() => showRecords(true)}>Enter Records</IonSegmentButton>
                  <IonSegmentButton value="favorites" onClick={() => showRecords(false)}>Check Records</IonSegmentButton>
                </IonSegment>
              </IonToolbar>

            </IonHeader>
            <div className="datacontent" id="main">
              <BeeSpecies content="Bee Species Name" />
              <BeeSpecies content="Bee Species Name" />
              <BeeSpecies content="Bee Species Name" />
              <BeeSpecies content="Bee Species Name" />
              <BeeSpecies content="Bee Species Name" />
              <BeeSpecies content="Bee Species Name" />

            </div>


          </IonContent> </IonPage></>
    
    
  );
};

export default DuringWalk;
