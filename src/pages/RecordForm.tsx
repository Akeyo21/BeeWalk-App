import { IonContent, IonHeader, IonPage, IonRouterOutlet, IonList, IonItem, IonIcon, IonLabel, IonNote, IonListHeader, IonTabButton, IonTabBar, IonInput, IonButton, IonLoading, IonFabButton, IonFab, IonCol, IonGrid, IonImg, IonRow, IonAlert, IonText, IonBackButton } from '@ionic/react';
import React, { useContext, useEffect, useState } from 'react';

import './Default.css';
import RecordingForm from '../components/Form';
import Login from "../pages/Login";
import Walkdetail from "./Detail";
import {Route} from 'react-router-dom';
import { useSelector, connect, useDispatch } from 'react-redux';
import { BeeSpecies } from '../Reducers/SpeciesReducer';
import { usePhotoGallery, Photo } from './Camera';
import { camera } from 'ionicons/icons';
import MapWalk from './MapWalk';
import SpeciesList from './DuringWalk';
import { photosPresent } from '../Actions/Photos';
import { ObjectFlags } from 'typescript';
import { setFalse } from '../Actions/MemoryFull';
//import { BeeSpecies } from '../reducers/SpeciesReducer';
interface ContainerProps { 
  species: BeeSpecies|any,
  photo:number|any,
  memory:boolean,
  sectionNumber:number|any
}
const RecordForm: React.FC<ContainerProps> = (props) => {
  let section:any =props.sectionNumber.temps.sectionNumber ;
  //console.log(props.sectionNumber.getSectionNumber());
 /* for (const property in (props.sectionNumber)){   
    section = props.sectionNumber[property]
    console.log(section.sectionNumber)
  }*/
  console.log(props.sectionNumber.temps.sectionNumber)
    let {  newPhotosTaken,photos, takePhoto } = usePhotoGallery();
    
     console.log(props.sectionNumber)
    /**Add photos to the store */
    const addPhotos=()=>{
      takePhoto();
      
      console.log(photos)
    } 
   // console.log(props.photos)
    
    
  const dispatch = useDispatch()
  const [memoryAlert, setMemoryAlert] = useState(false)

  const addPhotosToStore=async ()=>{
    
    let s = await addPhotos();
    if(photos.length==0){
      dispatch(setFalse())
    }
    if(props.memory==true){
      setMemoryAlert(true)
    }
      //dispatch(addPhoto()) 
    
  }
    if (photos){      
      console.log("There are some")
      
    }
    console.log(photos)
    console.log(newPhotosTaken)
  let speciesEntered:any
  

  //const head=()=>{
  //extracts the beespecies value from the props(extracted from the store)
  for (const property in (props.species)){   
    speciesEntered = props.species[property]
  }
  let photoinitial =0
  for (const property in (props.photo)){   
    photoinitial = props.photo[property]
  }
  console.log(photos.length-photoinitial)
  let difference = photos.length-photoinitial
 const test =()=>{
   console.log("TRYING")
 }
  return (
    <><><IonRouterOutlet>
      
      <Route exact path="/map" component={MapWalk} />
      <Route path="/start/duringwalk" component={SpeciesList}/>
    </IonRouterOutlet></>
      <IonPage >
        <IonContent fullscreen className="content">
         <IonAlert
                isOpen={memoryAlert}
                onDidDismiss={() => setMemoryAlert(false)}
                cssClass='submitalert'
                header={'Memory Full'}
                message={'Photos cannot be stored with full memory'}
                buttons={[
                  {
                    text: 'OK'
                  },

                  {
                    text: 'Cancel',
                    role: 'cancel'
                  }
                ]} />
            
            
            
          <RecordingForm species = {speciesEntered} photos={photos.slice(photos.length-difference, photos.length)} section={section}/>
          <IonGrid>
      <IonRow>
      { props.memory==true? <IonText></IonText>: photos.slice(photos.length-difference, photos.length).map((photo, index) => (
          <IonCol size="6" key={index}>
            <IonImg src={photo.webviewPath} />
          </IonCol>
        ))}
      </IonRow>
    </IonGrid> 
          <IonFab vertical="bottom" horizontal="center" slot="fixed" color="warning">
          <IonFabButton onClick={() => addPhotosToStore()}>
      <IonIcon icon={camera}></IonIcon>
    </IonFabButton>
    </IonFab>
        </IonContent>
      </IonPage></>
  );
};

const mapStateToProps = function(state: any) {
  return {
    species: state.species,
    photo:state.photos,
    memory:state.memoryFull,
    sectionNumber: state.temps,
  }
}

export default connect(mapStateToProps)(RecordForm);/*
export default RecordForm;*/
