import React, { useState } from 'react';
import '../components/ExploreContainer.css';
import {IonAlert, IonButton, IonContent, IonHeader, IonIcon, IonLabel, IonPage, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs} from '@ionic/react';
import { connect, useDispatch } from 'react-redux';
import { Loader } from '@googlemaps/js-api-loader';
import { Redirect, Route } from 'react-router';
import SectionDetails from './SectionDetails';

import {  resetRecords } from '../Actions/Records';
import { photosPresent } from '../Actions/Photos';
import { usePhotoGallery, promiseState } from './Camera';
import { addWalk, resetWalk } from '../Actions/Walks';
import { UpdatedWalk } from '../Reducers/WalksReducer';
import { setFalse } from '../Actions/MemoryFull';

interface ContainerProps { 
    records:[]|any
    walk:any
    memoryFull:boolean
    transects:[]
}

const   Map: React.FC<ContainerProps> = (props) => {
    let transectslist: any[] =[]
  for(const property in props.transects){
   transectslist = props.transects[property]
 }
 //console.log(transectslist[0]);

 //let selectedPath = new google.maps.MVCArray([]);
 let walk;
 for(const property in props.walk){
    console.log(props.walk[property])
    walk = props.walk[property]
    console.log(walk)
 }
 let selectedPath = [];

 for (const section in transectslist[walk.transect].sections){
     console.log(transectslist[walk.transect].sections[section])
    for (const pos in transectslist[walk.transect].sections[section].positions){
        selectedPath.push(transectslist[walk.transect].sections[section].positions[pos])
    }
 }
 let recordsEntered:[] = []
 for(const property in props.records){
   recordsEntered = props.records[property]
  
}
 //console.log(selectedPath)
    //get user current position
    const [latitude, setlat] = useState(0);
    const [long,  setlong] = useState(0);
    const[filled, setfilled] = useState(false);
    const[findLive, setFindLive] = useState(false);
    const [redirectRecords, setRedirectRecords] = useState(false)

    const [enterRecord, setEnterRecord] = useState(false);
    const [memoryAlert, setMemoryAlert] = useState(false)
    const [redirectToSectionDetails, setRedirectToDetails] = useState(false);
    const [showAlert1, setShowAlert1] = useState(false);
    const [redirectHome, setRedirectHome] = useState(false);

    const dispatch = useDispatch()
    //prompts user to scroll to the position if navigation
    //fails
    const [showScrollToPos, setScrollToPos] = useState(true)
    navigator.geolocation.getCurrentPosition(function(position) {        
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
        setlat(position.coords.latitude)
        setlong(position.coords.longitude)
        setfilled(true)
      });
    
  let { photos, takePhoto } = usePhotoGallery();
  
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
      
     }
    
    //button controls added on top of map
    const buttonsControl =(div:Element, map: google.maps.Map)=>{
        //the buttons to be included on the map
        /*<IonButton color="warning" className="move-lower" shape="round" onClick={()=>(take())}>Record with<br/>photo/video</IonButton>
  <IonButton color="warning" className="move-lower"  shape="round" href="/start/recordform" >Record without<br/> photo/video</IonButton>
    <IonButton color="warning"  className="buttons" shape="round"  onClick={()=>(record())}>Records <br/>entered</IonButton>
    <IonButton color="warning"  className="buttons" shape="round" onClick={() => setShowAlert1(true)}>
      Save Records
      </IonButton>*/
        const photoButton = document.createElement("button");
        photoButton.innerHTML = "Record with photo/video";
        photoButton.style.padding="4% 3%";
        photoButton.style.backgroundColor = "white";
        photoButton.style.color = "black";
        photoButton.style.margin = "0 2% 0 0";
        
        const withoutButton = document.createElement("a");
        withoutButton.id = "without"
        withoutButton.innerHTML = "Record without photo/video";
        withoutButton.style.padding="4% 3%";
        withoutButton.style.margin="10% 0";
        withoutButton.style.backgroundColor = "white";
        withoutButton.style.color = "black";

        const recordsButton = document.createElement("button");
        recordsButton.innerHTML = "Records entered";
        recordsButton.style.padding="4% 3%";
        recordsButton.style.margin="0 2% 0 0";
        recordsButton.style.backgroundColor = "white";
        recordsButton.style.color = "black";

        const saveButton = document.createElement("button");
        saveButton.innerHTML = "Save Records";
        saveButton.style.padding="4% 3%";
        saveButton.style.margin="10% 0";
        saveButton.style.backgroundColor = "white";
        saveButton.style.color = "black";
        
        div.appendChild(photoButton);
        div.appendChild(withoutButton);
        div.appendChild(recordsButton);
        div.appendChild(saveButton);
        photoButton.addEventListener("click",take)

        withoutButton.href = "/start/recordform"
        recordsButton.addEventListener("click", record)
        saveButton.addEventListener("click", function(){
            setShowAlert1(true)
        })
        
    }
    const loader = new Loader({
        apiKey: "AIzaSyAmfNAhG-WbTTCN-7JmHApcvr9e1tYirGw"
      });
      console.log("here")
      let map: google.maps.Map;
      let poly: google.maps.Polyline;
      loader.load()
      .then(() => {
          console.log("map should be here")
        if (filled){
            
            setScrollToPos(false)
        map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
          center: { lat: latitude, lng: long },
          zoom: 14,
        });}else{
            map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
                center: { lat: latitude, lng: long },
                zoom: 14,
              })  
        }
        poly = new google.maps.Polyline({
            strokeColor: "#000000",
            strokeOpacity: 1.0,
            strokeWeight: 3,
            editable:true
          });
          poly.setMap(map);
          
        // Create the DIV to hold the control and call the CenterControl()
        // constructor passing in this DIV.
        const buttonsDiv = document.createElement("div");
        buttonsDiv.id = "buttonsDiv";
        buttonsControl(buttonsDiv, map);

        map.controls[google.maps.ControlPosition.TOP_CENTER].push(buttonsDiv);
          // Add a listener for the click event
        //map.addListener("click", addLatLng);
        initLiveLocation();
          //remove an edge of the transect when setting up
          

        const bermudaTriangle = new google.maps.Polygon({
            paths: selectedPath,
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FF0000",
            fillOpacity: 0.35,
          });
          bermudaTriangle.setMap(map);
    });

    
    //add button to set up the sections
    //ensure that a section has been entered
    //go to allow for details on habitat and land use 
    //to be updated
    //finish setting up transect
    
    if(redirectToSectionDetails ==true){
        return <Redirect to="/sectiondetails"/>
    }


    //get Live location of user
    let liveLocation = null;
    const options ={
        enableHighAccuracy : true
    };
    //first add current location of user to the polyline then add the prograssive ones 
    const trackUser = (position)=>{
        //console.log(position.coords.latitude);
        let liveposition = new google.maps.LatLng({lat: position.coords.latitude, lng: position.coords.longitude});
        //addLatLng(liveposition);
    };

    const catchErrors = (e)=>{
        setFindLive(true);
    };
    //get live location everytime
    const initLiveLocation = ()=>{
        liveLocation = navigator.geolocation.watchPosition(trackUser, catchErrors, options);
    }
    
  return (
    <><IonRouterOutlet>
    <Route path="/sectiondetails" component={SectionDetails} />

</IonRouterOutlet>
    <IonPage >
        <IonHeader>
        </IonHeader>
        <IonContent fullscreen className="content">
    <div id="map" className="transectmap">

       <IonAlert
                isOpen={showScrollToPos}
                onDidDismiss={() => setScrollToPos(false)}
                cssClass='submitalert'
                header={'Map cannot spot where you are'}
                message={'Scroll to where you are'}
                buttons={[
                  {
                    text: 'OK',
                   
                  }
                ]} />
        <IonAlert
                isOpen={findLive}
                onDidDismiss={() => setFindLive(false)}
                cssClass='submitalert'
                header={'Live Location'}
                message={'Problem finding live location. Try again or set it up manually'}
                buttons={[
                  {
                    text: 'OK',
                   
                  },
                  {
                    text: 'Set Manually',
                   
                  }
                ]} />
        
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

    </div>
    </IonContent>
    </IonPage></>
    
  );
};
const mapStateToProps = function(state: any) {
    return {
      records:state.records,
      walk:state.walk,
      memoryFull: state.memoryFull,
      transects:state.transects
    }
  }
export default connect(mapStateToProps)(Map);