import React, { useEffect, useState } from 'react';
import '../components/ExploreContainer.css';
import { IonAlert, IonBackButton, IonButton,  IonButtons,  IonCol,  IonContent, IonDatetime, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonList, IonLoading, IonPage, IonRouterOutlet, IonRow, IonSelect, IonSelectOption, IonText, IonToolbar } from '@ionic/react';
/*import '../components/LoginPage.css';*/
import './PreWalk.css';
import {Redirect, Route} from 'react-router-dom';
/*import { Map, GoogleApiWrapper } from 'google-maps-react';
import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'*/
import Records from './RecordsEntered'
//import "leaflet/dist/leaflet.css";
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
import {Map, InfoWindow, Marker, GoogleApiWrapper, Polyline} from 'google-maps-react';

//import {GoogleApiWrapper} from 'google-maps-react';
//import {GoogleMapReact} from "google-map-react";
/*import GoogleMapReact from 'google-map-react';
import { GoogleMap, Marker } from "react-google-maps"*/
    /*PreWalk - opens the first page containing details 
    required prior to starting the beewalk
*/
interface ContainerProps { 
  google: any
  records:[]|any
  walk:any
  memoryFull:boolean
}
const line = ()=>{
  return 
}
const MapWalk: React.FC<ContainerProps> = (props) => {
  
   
  let { photos, takePhoto } = usePhotoGallery();
   console.log(props.walk)
 const dispatch = useDispatch()
  const [redirectRecords, setRedirectRecords] = useState(false)
  const [addToPath, setPath] = useState(false);
      const [showAlert1, setShowAlert1] = useState(false);
      const [redirectHome, setRedirectHome] = useState(false);
  
      const [latitude, setlat] = useState(0)
      const [long,  setlong] = useState(0)  
      
  const [path1, addPath] = useState([])
 const [memoryAlert, setMemoryAlert] = useState(false)
 const [ filled, setfilled] = useState(false)
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
     
                <Map google={props.google} initialCenter={{
            lat: latitude,
            lng:long
        }} style={style} 
      >
           <Polyline
          path={triangleCoords}
          strokeColor="#0000FF"
          strokeOpacity={0.8}
          strokeWeight={2}  geodesic={true} editable/>     
   */
  }
  

console.log(path1)
  console.log("In the map page")
  navigator.geolocation.getCurrentPosition(function(position) {
    
    console.log("Latitude is :", position.coords.latitude);
    console.log("Longitude is :", position.coords.longitude);
    setlat(position.coords.latitude)
    setlong(position.coords.longitude)
    setfilled(true)
  });
  console.log(latitude)
  console.log(long)
  const style1 = {
    position:'absolute',
    height:'100%'
  }
  const addPoints=(value, pos:Object)=>{
    path1.push(pos)
    console.log(value.children[0].props.path)
    console.log(value)
  console.log("points path: ", path1)
  }
  const see=()=>{
    console.log(path1[0])
    console.log("Polyline should pop up")
    setPath(true)
  }
  
  
  return (
    
    <>
    <IonRouterOutlet>
          <Route exact path='/start/records' component={Records} />
  </IonRouterOutlet>
  
      
  {filled?
  <Map google={props.google} initialCenter={{lat:latitude, lng:long}} style={style1} className="map"
  onClick={(value, other, next)=>{ 
    addPoints(value, {lat:next.latLng.lng(), lng:next.latLng.lat()} )}} 
      >
        {addToPath && path1.length>0?
         <Polyline
         path={path1}
         strokeColor="#0000FF"
         strokeOpacity={0.8}
         strokeWeight={2}  visible = {true} editable className="poly" onClick={(value)=>{console.log(value)}}/>  : <div></div>}
        
        
        
<IonButton color="warning" className="move-lower" shape="round" onClick={()=>(take())}>Record with<br/>photo/video</IonButton>
  <IonButton color="warning" className="move-lower"  shape="round" href="/start/recordform" >Record without<br/> photo/video</IonButton>
    <IonButton color="warning"  className="buttons" shape="round"  onClick={()=>(record())}>Records <br/>entered</IonButton>
    <IonButton color="warning"  className="buttons" shape="round" onClick={() => setShowAlert1(true)}>
      Save Records
      </IonButton>
      <IonButton id="marker" onClick={()=>see()}>add marker</IonButton>
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
     
 
        
 </Map>:<IonText></IonText>}
  
      </>
  
    
  );
};

const WrappedContainer = GoogleApiWrapper({
  apiKey: 'AIzaSyAmfNAhG-WbTTCN-7JmHApcvr9e1tYirGw'
})(MapWalk);
/*
export default WrappedContainer;

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAmfNAhG-WbTTCN-7JmHApcvr9e1tYirGw'
})(MapWalk);
*/
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
export default MapWalk;*/
export default connect(mapStateToProps)(WrappedContainer);
