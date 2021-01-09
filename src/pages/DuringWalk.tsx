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
import BeeRecords from '../components/BeeRecords'

import ReactDOM from 'react-dom';
import Postlogin from './Postlogin';
import { ReactComponent } from '*.svg';

/*
    DuringWalk - page that collects data during walk
*/
interface ContainerProps { 
}

/*export default class SayHello extends React.Component<SayHelloProps,SayHelloState> {
  constructor(props: SayHelloProps) {
    super(props);
    this.state = {
      count: 0
    };
  }*/
//const DuringWalk: React.FC<ContainerProps> = () => {
export default class DuringWalk extends React.Component{
  render(){
  const RepeatSpecies: React.FC<ContainerProps> = () => {
    return(
      <><BeeSpecies content="Bee Species Name 1"/>
        <BeeSpecies content="Bee Species Name 2" />
        <BeeSpecies content="Bee Species Name 3"/>
        <BeeSpecies content="Bee Species Name 4"/></> 
    )
  };

  const RepeatRecords: React.FC<ContainerProps> = () => {
    return(
      <><BeeRecords content="Bee Records"/>
        <BeeRecords content="Bee Records"/>
        <BeeRecords content="Bee Records"/>
        <BeeRecords content="Bee Records"/>
        <BeeRecords content="Bee Records"/></>
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
  const [redirectHome, setRedirectHome] = useState(false)
  /*Change between pages when ok is clicked in alert*/
  if (redirectHome==true){
    return <Redirect to='/frontpage' />
  }
  return (
    <><></><><IonRouterOutlet>
      <Route path="/start/duringwalk/manual" component={ManualData} />
    </IonRouterOutlet></>
      <IonPage>
          <IonContent fullscreen className="whitebackground ">
          
            <IonHeader className="switch">
              <IonButton color="light" href="/start/duringwalk/manual" >
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
                    handler:()=>{
                      setRedirectHome(true)
                    }
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
              <BeeSpecies content="Bee Species Name 1" />
              <BeeSpecies content="Bee Species Name 2" />
              <BeeSpecies content="Bee Species Name 3" />
              <BeeSpecies content="Bee Species Name 4" />
              <BeeSpecies content="Bee Species Name 5" />
              <BeeSpecies content="Bee Species Name 6" />

            </div>


          </IonContent> </IonPage></>
    
    
  );
};
}
export const MContext = React.createContext("");  
//export default DuringWalk;
