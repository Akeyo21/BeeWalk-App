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
import {cSnapToRoute} from './Trial';
import { changeTemp } from '../Actions/temps';
import { Temps } from '../Reducers/temps';
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
 let selectedPath: { last: any, first:any }[] = [];
if(transectslist[walk.transect]){
  console.log("transect", transectslist[walk.transect])
 for (const section in transectslist[walk.transect].sections){
    let last=transectslist[walk.transect].sections[section].positions.length-1
    let firstpos = transectslist[walk.transect].sections[section].positions[0]
    let lastpos = transectslist[walk.transect].sections[section].positions[last]
     //console.log()
        selectedPath.push({first: firstpos, last:lastpos})
    
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
            console.log(position.coords.latitude, position.coords.longitude)
             liveposition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
              map.setCenter(liveposition);
              markerLivePos = new google.maps.Marker({
                position: liveposition,
                map: map,
              })
          });
      } 
      
      let pathlist: any[] = [];
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
      console.log(pathlist)
          
        // Create the DIV to hold the control and call the CenterControl()
        // constructor passing in this DIV.
        const buttonsDiv = document.createElement("div");
        buttonsDiv.id = "buttonsDiv";
        buttonsControl(buttonsDiv, map);
        //let polylinetest = 
        map.controls[google.maps.ControlPosition.TOP_CENTER].push(buttonsDiv);
          // Add a listener for the click event //new (TestConstructorFunction as any)(1, 2);
          oSnap.init(map, poly);
          map.addListener("click", (event: { latLng: any; })=>{
            console.log(event.latLng.lat())
            console.log(typeof event.latLng);
            //console.log(liveposition.latLng())
            console.log(oSnap.getClosestLatLng(liveposition).toString())
          })
        initLiveLocation();
          //remove an edge of the transect when setting up
          

    });
  });
  
  var oSnap = new (cSnapToRoute as any);
//console.log(recordsEntered)
 
  
    
    if (redirectRecords ==true){
      return <Redirect to='/start/records'/>
    }
    
    if(enterRecord){
      let route = '/start/recordform'
      return <Redirect to={route}/>
     
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
        const photoButton = document.createElement("a");
        photoButton.innerHTML = "Home";
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
        
        div.appendChild(withoutButton);
        div.appendChild(recordsButton);
        
        //div.appendChild(photoButton);
        //photoButton.href="/"
        //photoButton.addEventListener("click",take)
        withoutButton.addEventListener("click", sendSectionNumber)
        recordsButton.addEventListener("click", record)
        
        
    }
    const sendSectionNumber=(e:any)=>{
      console.log("Here")
          
          let sectionNumber:number|any 
          console.log(liveposition)
          let lastMarker = new google.maps.Marker({
            position: oSnap.getClosestLatLng(liveposition),
            map: map,
          });
          for(let i=0;i<selectedPath.length;i++){
            let arr = []
            arr.push(selectedPath[i].first)
            arr.push(selectedPath[i].last)
            let polytest = new google.maps.Polygon({
              paths:arr
            });
            if(google.maps.geometry.poly.containsLocation(oSnap.getClosestLatLng(liveposition), polytest)){
              console.log("In Section", i+1);
              sectionNumber = i+1
            }
          }
          console.log("Section number is", sectionNumber);
          let temp = new Temps(sectionNumber, false, false);
          dispatch(changeTemp(temp));
          setEnterRecord(true)
          
          //check if near transect --not sure if necessary
          /*
          if (google.maps.geometry.poly.isLocationOnEdge(initialLocation, poly, 10e-3)) {
            console.log(oSnap.getClosestLatLng(initialLocation))
            console.log("Here");
          }else{
            console.log("Not here");
          }*/
        //});

     // } 
    }
      let map: google.maps.Map;
      let poly: google.maps.Polyline;      
      let markerLivePos: google.maps.Marker;

    
    //add button to set up the sections
    //ensure that a section has been entered
    //go to allow for details on habitat and land use 
    //to be updated
    //finish setting up transect
    
    


    //get Live location of user
    let liveLocation = null;
    let liveposition: google.maps.LatLng | google.maps.LatLngLiteral | null | any;
    const options ={
        enableHighAccuracy : true
    };
    //first add current location of user to the polyline then add the prograssive ones 
    const trackUser = (position: { coords: { latitude: any; longitude: any; }; })=>{
        //console.log(position.coords.latitude);
        liveposition = new google.maps.LatLng({lat: position.coords.latitude, lng: position.coords.longitude});
        //addLatLng(liveposition);
        markerLivePos.setPosition(liveposition);
    };

    const catchErrors = (e: any)=>{
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
