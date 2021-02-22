import React, { useEffect, useState } from 'react';
import '../components/ExploreContainer.css';
import { IonAlert, IonBackButton, IonButton,  IonButtons,  IonCol,  IonContent, IonDatetime, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonList, IonLoading, IonPage, IonRouterOutlet, IonRow, IonSelect, IonSelectOption, IonText, IonToolbar } from '@ionic/react';
/*import '../components/LoginPage.css';*/
import './PreWalk.css';
import {Redirect, Route} from 'react-router-dom';
/*import { Map, GoogleApiWrapper } from 'google-maps-react';
import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'*/
import Records from './RecordsEntered'
import "leaflet/dist/leaflet.css";
/*import {
    GoogleMaps,
    GoogleMap,
    GoogleMapsEvent,
    GoogleMapOptions,
    CameraPosition,
    MarkerOptions,
    Marker,
    Environment
  } from '@ionic-native/google-maps';*/
import { connect, useDispatch } from 'react-redux';
import {  resetRecords } from '../Actions/Records';
import { photosPresent } from '../Actions/Photos';
import { usePhotoGallery, promiseState } from './Camera';
import { addWalk, resetWalk } from '../Actions/Walks';
import { UpdatedWalk } from '../Reducers/WalksReducer';
import { setFalse } from '../Actions/MemoryFull';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
    /*PreWalk - opens the first page containing details 
    required prior to starting the beewalk
*/
interface ContainerProps { 
  google: any
  records:[]|any
  walk:any
  memoryFull:boolean
}

const MapWalk: React.FC<ContainerProps> = (props) => {
  
   
  let { photos, takePhoto } = usePhotoGallery();
   console.log(props.walk)
   
 const dispatch = useDispatch()
  const [redirectRecords, setRedirectRecords] = useState(false)
  /*useEffect(()=>{
    dispatch(photosPresent(photos.length))
    //document.title = `You clicked ${count} times`;
  },[photos.length]);*/
      const [showAlert1, setShowAlert1] = useState(false);
      const [redirectHome, setRedirectHome] = useState(false);
      
 const [memoryAlert, setMemoryAlert] = useState(false)
      /*Change between pages when ok is clicked in alert
      
  AIzaSyAmfNAhG-WbTTCN-7JmHApcvr9e1tYirGw - API key
  */
 let recordsEntered:[] = []
 for(const property in props.records){
   recordsEntered = props.records[property]
  
}
console.log(recordsEntered)
 const sendRecordsToStorage=()=>{
   //write 
   for(const property in props.walk){
    console.log(props.walk[property])
    let walk = props.walk[property]
    
    //endtime
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = new Date().getHours() + ":" + new Date().getMinutes()
    var all = new Date(date + " "+time)
    dispatch(addWalk(new UpdatedWalk(walk.recorder, walk.transect,walk.date,walk.startTime, walk.temp,
      walk.sunshine, walk.windSpeed 
      ,time, recordsEntered)))
  }
 }
 const clearRecords=()=>{
  sendRecordsToStorage()
  dispatch(resetWalk())
  dispatch(resetRecords())
  //clearPhotos()
  setShowAlert1(true)
  setRedirectHome(true)
 }
 const [enterRecord, setEnterRecord] = useState(false);

  if (redirectHome==true){
    return <Redirect to='/frontpage' />
  } 
  if (redirectRecords ==true){
    return <Redirect to='/start/records'/>
  }
  if(enterRecord){
    return <Redirect to='/start/recordform'/>
  }
  
  const record=()=>{
    dispatch(photosPresent(photos.length))
    setRedirectRecords(true)
    
  }
 const picha = ()=>{
   
     takePhoto()
    /*console.log(s)
    console.log()
    promiseState(s, function(state) {
          
      if(state=='rejected'){
        console.log("reject")
        setShowAlert1(true)
      }
      })*/
 }
  const take=async ()=>{
    dispatch(photosPresent(photos.length))
    let s = await picha()
    if(photos.length==0){
      dispatch(setFalse())
    } 
    console.log(props.memoryFull)
    if(props.memoryFull==true){
      setMemoryAlert(true)
    }else{
    setEnterRecord(true)

    }
    /**

                <Map google={props.google} >
 
        
      </Map>
   */
  }
  console.log("In the map page")
  return (
    
    <>
    <IonRouterOutlet>
          <Route exact path='/start/records' component={Records} />
  </IonRouterOutlet>
  <IonButton color="warning" size="large" className="buttons" shape="round" expand="block" onClick={()=>(take())}>Record with photo/video</IonButton>
    
     <IonButton color="warning" size="large" className="buttons" shape="round" expand="block" href="/start/recordform" >Record without photo/video</IonButton>
    <IonButton color="warning" size="large" className="buttons" shape="round" expand="block" onClick={()=>(record())}>Records entered</IonButton>
    <IonButton color="warning" size="large" className="buttons" shape="round" expand="block" onClick={() => setShowAlert1(true)}>
      Save Records
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
                      clearRecords()
                    }
                  },

                  {
                    text: 'Cancel',
                    role: 'cancel'
                  }
                ]} />

<IonAlert
                isOpen={memoryAlert}
                onDidDismiss={() => setMemoryAlert(false)}
                cssClass='submitalert'
                header={'Memory Full'}
                message={'Photos cannot be taken with full memory'}
                buttons={[
                  {
                    text: 'OK'
                  },

                  {
                    text: 'Cancel',
                    role: 'cancel'
                  }
                ]} />
  
      </>
  
    
  );
};
/*export default GoogleApiWrapper({
  apiKey: 'AIzaSyDhPMb0EavEJE-Hb_bd3E3VmtzrkARXc7Q'
})(MapWalk);*/

const mapStateToProps = function(state: any) {
  return {
    records:state.records,
    walk:state.walk,
    memoryFull: state.memoryFull
  }
}
/*
export default GoogleApiWrapper({
  apiKey: 'AIzaSyAmfNAhG-WbTTCN-7JmHApcvr9e1tYirGw'
})/* connect(mapStateToProps)(MapWalk);
/*export default MapWalk;*/
export default connect(mapStateToProps)(MapWalk);
