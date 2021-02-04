import React from 'react';
import '../components/ExploreContainer.css';
import { IonBackButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonImg, IonPage, IonRouterOutlet, IonRow, IonText, IonToolbar } from '@ionic/react';

import './Default.css';
import BeesInArea from '../components/BeesInArea';
import PreWalk from "../pages/PreWalk";
import {Route} from 'react-router-dom';
import MapWalk from './MapWalk'
import { connect } from 'react-redux';
import { Record } from '../Reducers/RecordsReducer';
import SpeciesEntered from '../components/SpeciesEntered';
interface ContainerProps { 
    records: []
}
/* CommonBees - page that shows the common bees in the are
*/
const RecordsEntered: React.FC<ContainerProps> = (props) => {
    console.log(props.records)
    //obtaining records list
    let recordslist: Record[] = []
    if (props.records){
      recordslist = Object.values(props.records)[0]
    }
    console.log(recordslist[0].species)
    recordslist.map((record: Record)=>(
      console.log(typeof record)))
    /*let photosAvailable = false
    if(records.getPhotos()){
      photosAvailable = true
    }
    /*let record: Record = new Record(photos)
    for (const property in (props.records)){   
        record = Object.values(props.records)[0]
      }
    if (Object.values(props.records)[0]){
       photos = record.getPhotos()
    }
    
    {Object.values(props.records)[0]? <IonRow>
        {photos.map((photo, index) => (
          <IonCol size="6" key={index}>
            <IonImg src={photo.webviewPath} />
          </IonCol>
        ))}
      </IonRow>:
        <><IonBackButton defaultHref="/start/map" icon="buttonIcon" text="BACK" className="ion-float-left" color="dark" /><br /><BeesInArea /><BeesInArea /><BeesInArea /><BeesInArea /><BeesInArea />
                                  <BeesInArea /></>}*/
  return (
    <><><IonRouterOutlet>
      <Route path="/start/map" component={MapWalk} />
    </IonRouterOutlet></>
      <IonPage>
        <IonHeader>
        </IonHeader>
        <IonContent fullscreen>
          <IonHeader >
          </IonHeader>
          <div className="container">
            
        <div className="wholepage "> 
        {recordslist.map((record: Record)=>(
         <SpeciesEntered species={record.species} photos={record.photos} flower={record.flower} section={record.section}/>
        )) }
        
        </div>
        </div>
          
          
        </IonContent>
      </IonPage></>
    
    
  );
};
const mapStateToProps = function(state: any) {
  
    console.log(state.records)
    return {
      records: state.records
    }
  }
  
  export default connect(mapStateToProps)(RecordsEntered);/*
export default RecordsEntered;*/
