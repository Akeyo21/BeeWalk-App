import React, { useEffect, useState } from 'react';
import '../components/ExploreContainer.css';
import {IonAlert,  IonContent, IonHeader,  IonPage, IonRouterOutlet} from '@ionic/react';
import { connect, useDispatch } from 'react-redux';
import { Loader } from '@googlemaps/js-api-loader';
import { Redirect, Route } from 'react-router';
import SectionDetails from './SectionDetails';

import {  resetRecords } from '../Actions/Records';
import { photosPresent } from '../Actions/Photos';
import { usePhotoGallery} from './Camera';
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
// console.log(transectslist[0]);

 //let selectedPath = new google.maps.MVCArray([]);
 let walk;
 for(const property in props.walk){
    console.log(props.walk[property])
    walk = props.walk[property]
    console.log(walk)
 }
 let selectedPath = [];
if(transectslist[walk.transect]){
  console.log("transect", transectslist[walk.transect])
 for (const section in transectslist[walk.transect].sections){
     //console.log(transectslist[walk.transect].sections[section])
     //console.log(transectslist[walk.transect].sections[section].length)
    //for (const pos in transectslist[walk.transect].sections[section].positions){
    let last=transectslist[walk.transect].sections[section].positions.length-1
    let firstpos = transectslist[walk.transect].sections[section].positions[0]
    let lastpos = transectslist[walk.transect].sections[section].positions[last]
     //console.log()
        selectedPath.push({first: firstpos, last:lastpos})
    //}
 }}
 //console.log(selectedPath);
 let recordsEntered:[] = []
 for(const property in props.records){
   recordsEntered = props.records[property]
  
}
 //console.log(selectedPath)
    //get user current position
    const[findLive, setFindLive] = useState(false);
    const [redirectRecords, setRedirectRecords] = useState(false)

    const [enterRecord, setEnterRecord] = useState(false);
    const [memoryAlert, setMemoryAlert] = useState(false)
    const [redirectToSectionDetails, setRedirectToDetails] = useState(false);
    const dispatch = useDispatch()
    //prompts user to scroll to the position if navigation
    //fails
    const [showScrollToPos, setScrollToPos] = useState(false)
    
    
  let { photos, takePhoto } = usePhotoGallery();
 
  useEffect(() => {
    // Update the document title using the browser API
    const loader = new Loader({
      apiKey: "AIzaSyAmfNAhG-WbTTCN-7JmHApcvr9e1tYirGw"
    });
    loader.load()
      .then(() => {
         
        map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
         
          zoom: 14,
        })
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function (position) {
             let  initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
              map.setCenter(initialLocation);
              markerLivePos = new google.maps.Marker({
                position: initialLocation,
                map: map,
              })
          });
      } 
      
      let pathlist = [];
      var iconBase = 'http://maps.google.com/mapfiles/kml/shapes/';
      for(let i=0;i<selectedPath.length;i++){
        let contentString = '<div id="dark-text"><p>Section '+(i+1) +'</p></div>'
          const infowindow = new google.maps.InfoWindow({
            content: contentString,
          });  
        let marker = new google.maps.Marker({
          position: selectedPath[i].first,
          icon:{
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: 'white',
            fillOpacity: 1,
            scale: 3,
            strokeColor: 'black',
            strokeWeight: 1,
            strokeOpacity: 1,
            // anchor: new google.maps.Point(200, 200)
          },
          //title: "#" + sections.length,
          map: map,
        });
        marker.addListener("click", () => {
          infowindow.open(map, marker);
        });
        
        pathlist.push(selectedPath[i].first);
        pathlist.push(selectedPath[i].last)
      }
      //let pathlist = [selectedPath[0].first, selectedPath[0].last];
      poly = new google.maps.Polyline({
        path:pathlist,
        strokeColor: "#000000",
        strokeOpacity: 1.0,
        strokeWeight: 3
      });
      let contentString = '<div id="dark-text"><p>Last Point on Transect</p></div>'
          const infowindow = new google.maps.InfoWindow({
            content: contentString,
          });  
      let lastMarker = new google.maps.Marker({
        position: pathlist[pathlist.length-1],
        icon:{
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: 'white',
          fillOpacity: 1,
          scale: 3,
          strokeColor: 'black',
          strokeWeight: 1,
          strokeOpacity: 1,
          // anchor: new google.maps.Point(200, 200)
        },
        //title: "#" + sections.length,
        map: map,
      });
      lastMarker.addListener("click", () => {
        infowindow.open(map, lastMarker);
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
          

    });
  });
//console.log(recordsEntered)
 
 
  
    
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
        const photoButton = document.createElement("button");
        photoButton.innerHTML = "Record with photo/video";
        photoButton.className = "map-buttons";         
        photoButton.style.margin = "0 2% 0 0";
        
        const withoutButton = document.createElement("a");
        withoutButton.id = "without"
        withoutButton.innerHTML = "Record Observation";
        withoutButton.className = "map-buttons";
        withoutButton.style.margin="10% 0";

        const recordsButton = document.createElement("button");
        recordsButton.innerHTML = "View Records entered";
        recordsButton.className = "map-buttons";
        recordsButton.style.margin="12% 2% 0 0";
        
        //div.appendChild(photoButton);
        div.appendChild(withoutButton);
        div.appendChild(recordsButton);
        //div.appendChild(saveButton);
        photoButton.addEventListener("click",take)

        withoutButton.href = "/start/recordform"
        recordsButton.addEventListener("click", record)
        
        
    }
    
   
      let map: google.maps.Map;
      let poly: google.maps.Polyline;      
      let markerLivePos: google.maps.Marker;

    
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
        markerLivePos.setPosition(liveposition);
    };

    const catchErrors = (e)=>{
        setFindLive(true);
    };
    //get live location everytime
    const initLiveLocation = ()=>{
      //remove any markers present in the ap showing the location        
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
