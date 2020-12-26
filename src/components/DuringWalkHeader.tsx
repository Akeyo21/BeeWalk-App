import React , {constructor, useCallback, useContext, useState} from 'react';
/*import './ExploreContainer.css';*/
import {IonButton, IonCard, IonCardContent, IonCol, IonGrid, IonRow, IonRouterLink, IonSegment, IonSegmentButton, IonToolbar, IonAlert, IonRedirect, IonRouterOutlet, NavContext} from '@ionic/react';
/*import './LoginPage.css';*/
import "../pages/Default.css";
import '../theme/variables.css';
import BeeSpecies from './BeeSpecies';
import PostLogin from '../pages/Postlogin'
import ReactDOM from 'react-dom';
import { Redirect, Route } from 'react-router';
import { Component } from 'ionicons/dist/types/stencil-public-runtime';
import Postlogin from '../pages/Postlogin';
import { link } from 'ionicons/icons';
/* DuringWalkHeader - Is the template for the header 
    of the DuringWalk page that collects data during the walk
*/
interface ContainerProps {   
}
const DuringWalkHeader: React.FC<ContainerProps> = () => {
  
  /*<input type="submit" value="Log In" id="submit"></input>*/
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
    <>       
        <IonButton color="light" href="/start/duringwalk/manual">
          Add Manually
        </IonButton>

          <IonButton  onClick={() => setShowAlert1(true)} className="whitebackground ion-float-right">
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
              text:'OK',
              handler:()=>{
               done()
              }
            },
          
          {
            text:'Cancel',
            role:'cancel'
          }]}
          />

          <IonToolbar className="toolbar" >
                <IonSegment value="all">
                    <IonSegmentButton value="all" onClick={()=>showRecords(true)}>Enter Records</IonSegmentButton>
                    <IonSegmentButton value="favorites" onClick={()=>showRecords(false)}>Check Records</IonSegmentButton>
                </IonSegment>
          </IonToolbar> 
    </>  
  );
};

export default DuringWalkHeader;
