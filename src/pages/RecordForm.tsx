import { IonContent, IonHeader, IonPage, IonRouterOutlet, IonList, IonItem, IonIcon, IonLabel, IonNote, IonListHeader, IonTabButton, IonTabBar, IonInput, IonButton, IonLoading, IonFabButton, IonFab, IonCol, IonGrid, IonImg, IonRow } from '@ionic/react';
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
//import { BeeSpecies } from '../reducers/SpeciesReducer';
interface ContainerProps { 
  species: BeeSpecies|any,
  photo:number|any
}
const RecordForm: React.FC<ContainerProps> = (props) => {
  
  /*const bee = (state: { photos: number; }) => state.photos
  const todos = useSelector(bee)
  console.log(todos)*/
  
  /*if (props.species){
    if (!props.species) setLoading(true)
    setLoading(false)
  }<ul>
      {elements.map((value, index) => {
        return <li className="dark"key={index}>{value}</li>
      })}
    </ul>*/
    let {  newPhotosTaken,photos, takePhoto } = usePhotoGallery();
    
     
    /**Add photos to the store */
    const addPhotos=()=>{
      takePhoto();
      
      console.log(photos)
    } 
   // console.log(props.photos)
    
    
  const dispatch = useDispatch()
  const addPhotosToStore=()=>{
    addPhotos();
      //dispatch(addPhoto()) 
    
  }
    if (photos){
      
      
      console.log("There are some")
      
    }
    /*let recordslist:Record[]=[]
    if (photos){ 
      let record = new Record(photos)
      dispatch(addRecord(record))
    }else if(){

    }
    
    
    {props.photos? props.photos.map((photo, index) => (
          <IonCol size="6" key={index}>
            <IonImg src={photo.webviewPath} />
          </IonCol>
        )): <IonCol></IonCol>}*/
        /*for (const property in (props.photos)){   
         console.log( props.photos[property])
        }*/
    //let start = (photos.length-(props.photos+1))
    console.log(photos)
    console.log(newPhotosTaken)
  let speciesEntered:any
  const [photostaken, setPhotosTaken]= useState(0);
  useEffect(() => {
    // Update the document title using the browser API
    //document.title = `You clicked ${count} times`;
    setPhotosTaken(photos.length)
  });
  console.log(photostaken)

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
  const ex=()=>{
    let list = [1,2,3,4,5]
    console.log(list.slice(list.length-2, list.length-1))
  }
  console.log( photos.slice(5,6))
  ex()
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
            
                   
          <RecordingForm species = {speciesEntered} photos={photos.slice(photos.length-difference, photos.length)}/>
          <IonGrid>
      <IonRow>
      { photos.slice(photos.length-difference, photos.length).map((photo, index) => (
          <IonCol size="6" key={index}>
            <IonImg src={photo.webviewPath} />
          </IonCol>
        ))}
      </IonRow>
    </IonGrid> 
          <IonFab vertical="bottom" horizontal="center" slot="fixed">
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
    photo:state.photos
  }
}

export default connect(mapStateToProps)(RecordForm);/*
export default RecordForm;*/
