import { IonContent, IonHeader, IonPage, IonRouterOutlet, IonList, IonItem, IonIcon, IonLabel, IonNote, IonListHeader, IonTabButton, IonTabBar, IonInput, IonButton, IonLoading, IonFabButton, IonFab, IonCol, IonGrid, IonImg, IonRow } from '@ionic/react';
import React, { useContext, useState } from 'react';

import './Default.css';
import RecordingForm from '../components/Form';
import Login from "../pages/Login";
import Walkdetail from "./Detail";
import {Route} from 'react-router-dom';
import { useSelector, connect, useDispatch } from 'react-redux';
import { BeeSpecies } from '../Reducers/SpeciesReducer';
import { usePhotoGallery } from './Camera';
import { Record } from '../Reducers/RecordsReducer';
import { addRecord } from '../Actions/Records';
import { camera } from 'ionicons/icons';
import MapWalk from './MapWalk';
import SpeciesList from './DuringWalk';
//import { BeeSpecies } from '../reducers/SpeciesReducer';
interface ContainerProps { 
  species: BeeSpecies|any
}
const RecordForm: React.FC<ContainerProps> = (props) => {
  
  const bee = (state: { species: BeeSpecies; }) => state.species
  const todos = useSelector(bee)
  console.log(todos)
  
  /*if (props.species){
    if (!props.species) setLoading(true)
    setLoading(false)
  }<ul>
      {elements.map((value, index) => {
        return <li className="dark"key={index}>{value}</li>
      })}
    </ul>*/
    let {  photos, takePhoto } = usePhotoGallery();
    

    /**Add photos to the store */
    const addPhotos=()=>{
      takePhoto();
      
      console.log(photos)
    }  
    /*let recordslist:Record[]=[]
    if (photos){ 
      let record = new Record(photos)
      dispatch(addRecord(record))
    }else if(){

    }*/
    console.log(photos)
  let speciesEntered:any
  //const head=()=>{
  //extracts the beespecies value from the props(extracted from the store)
  for (const property in (props.species)){   
    speciesEntered = props.species[property]
  }
  return (
    <><><IonRouterOutlet>
      
      <Route exact path="/map" component={MapWalk} />
      <Route path="/start/duringwalk" component={SpeciesList}/>
    </IonRouterOutlet></>
      <IonPage >
        <IonHeader>
        </IonHeader>
        <IonContent fullscreen className="content">
          <IonHeader collapse="condense">            
          </IonHeader>
            
                   
          <RecordingForm species = {speciesEntered} photos={photos}/>
          <IonGrid>
      <IonRow>
        {photos.map((photo, index) => (
          <IonCol size="6" key={index}>
            <IonImg src={photo.webviewPath} />
          </IonCol>
        ))}
      </IonRow>
    </IonGrid> 
          <IonFab vertical="bottom" horizontal="center" slot="fixed">
          <IonFabButton onClick={() => addPhotos()}>
      <IonIcon icon={camera}></IonIcon>
    </IonFabButton>
    </IonFab>
        </IonContent>
      </IonPage></>
  );
};

const mapStateToProps = function(state: any) {
  
  console.log(state.species)
  return {
    species: state.species
  }
}

export default connect(mapStateToProps)(RecordForm);/*
export default RecordForm;*/
