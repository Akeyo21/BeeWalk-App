import React from 'react';
/*import './ExploreContainer.css';*/
import {IonButton, IonCard, IonCardContent, IonCol, IonGrid, IonRow, IonRouterLink, IonSegment, IonSegmentButton, IonToolbar} from '@ionic/react';
/*import './LoginPage.css';*/
import "../pages/Default.css";
import '../theme/variables.css';
import BeeSpecies from './BeeSpecies';
import ReactDOM from 'react-dom';
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
  return (   
    <>       
        <IonButton color="light" href="/start/duringwalk/manual">
          Add Manually
        </IonButton>

          <IonButton className="whitebackground ion-float-right">
              Submit
          </IonButton>

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
