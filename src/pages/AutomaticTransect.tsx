import React, { useState } from 'react';
import '../components/ExploreContainer.css';
import {IonAlert, IonButton, IonContent, IonHeader, IonIcon, IonLabel, IonPage, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs} from '@ionic/react';
import { connect, useDispatch } from 'react-redux';
import { Loader } from '@googlemaps/js-api-loader';
import { Section } from '../Reducers/SectionsReducer';
import { Redirect, Route } from 'react-router';
import SectionDetails from './SectionDetails';
import { setSections } from '../Actions/Transect';

interface ContainerProps { 
  
}

const   AutomaticTransect: React.FC<ContainerProps> = (props) => {
    
 
 //console.log(selectedPath)
    //get user current position
    const [latitude, setlat] = useState(0);
    const [long,  setlong] = useState(0);
    const[filled, setfilled] = useState(false);
    const[findLive, setFindLive] = useState(false);

    const [sections, changeSections] = useState([]);
    const [emptySection, setEmptySections]= useState(false);
    const [redirectToSectionDetails, setRedirectToDetails] = useState(false);
    const[redirectManualTransect, setManualTransect]= useState(false);

    //prompts user to scroll to the position if navigation
    //fails
    const [showScrollToPos, setScrollToPos] = useState(false)
    
    
    
    //button controls added on top of map
    const buttonsControl =(div:Element, map: google.maps.Map)=>{
        //the buttons to be included on the map
        const addSectionButton = document.createElement("button");
        addSectionButton.innerHTML = "Add Section";
        addSectionButton.style.padding="8% 10%";
        addSectionButton.style.backgroundColor = "white";
        addSectionButton.style.color = "black";
        
        const fillSectionButton = document.createElement("button");
        fillSectionButton.innerHTML = "Fill Section details";
        fillSectionButton.style.padding="10% 3%";
        fillSectionButton.style.margin="10% 0";
        fillSectionButton.style.backgroundColor = "white";
        fillSectionButton.style.color = "black";
        
        div.appendChild(addSectionButton);
        div.appendChild(fillSectionButton);
        addSectionButton.addEventListener("click",saveSection)
        fillSectionButton.addEventListener("click", addSections)
        
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
          //window.location.reload(false);
          map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
            //center: { lat: lat, lng: lng },
            zoom: 15,
          }); 
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
               let  initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                map.setCenter(initialLocation);
                addLatLng(initialLocation)
            });
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
          poly.addListener("dblclick", function giveOptions(event: google.maps.MapMouseEvent){
            const path = poly.getPath();
            console.log(path)
            let pathlist = path.getArray();
            let reduced = pathlist.filter(item=>item!==event.latLng)
            for (let i=0; i<path.getLength();i++){
                if( path.getAt(i) == event.latLng){
                    path.removeAt(i)
                }
            }

        });
        //console.log("inside function" , loaded)
      });
    
    
    function addLatLng(event) {
        console.log("Adding latlng")
        const path = poly.getPath();
        
        // Because path is an MVCArray, we can simply append a new coordinate
        // and it will automatically appear.
        //path.push(event.latLng);
        path.push(event)
        let contentString = '<div id="dark-text"><p>Section '+(sections.length+1) +'</p></div>'
    const infowindow = new google.maps.InfoWindow({
      content: contentString,
    });  
        // Add a new marker at the new plotted point on the polyline.
        let marker = new google.maps.Marker({
          position: path.getAt(0),
          title: "#" + sections.length,
          map: map,
        });
        marker.addListener("click", () => {
          infowindow.open(map, marker);
        });
    }

    //add button to set up the sections
    //ensure that a section has been entered
    //go to allow for details on habitat and land use 
    //to be updated
    //finish setting up transect
    const dispatch = useDispatch()
    const addSections =()=>{
      saveSection()
        //check there is a section added
        if(sections.length==0){
            setEmptySections(true);
        }else{
         
            dispatch(setSections(sections));
            setRedirectToDetails(true);
        }
    }
    function saveSection(){   
           
        const path = poly.getPath()
        const distance = google.maps.geometry.spherical.computeLength(path);
        
        //ensure that an actual section has bee entered
        if(path.getArray().length>0){
        let section: Section;
        section=new Section(distance, "0", [],[],path.getArray())        
        console.log(path, ' ',google.maps.geometry.spherical.computeLength(path))
        sections.push(section)

        //append last position to new polyline to join them all
        let last = path.getArray()[path.getArray().length-1]

        //generate different colors for the different poylines
        let colors = ['red', 'maroon', 'blue','silver', 'yellow','olive', 'lime', 'purple', 'orange', 'green',
        'pink', 'brown', 'coral', 'magenta', 'tan']
        let randomColor =Math.floor(Math.random()*colors.length-1)
        
        //new polyline for different sections
        poly=new google.maps.Polyline({
            path:[last],
            strokeColor: colors[randomColor],
            strokeOpacity: 1.0,
            strokeWeight: 3,
            editable:true
          });
        poly.setMap(map);
        //remove an edge of the transect when setting up
        poly.addListener("dblclick", function giveOptions(event: google.maps.MapMouseEvent){
            const path = poly.getPath();
            console.log(path)
            let pathlist = path.getArray();
            let reduced = pathlist.filter(item=>item!==event.latLng)
            for (let i=0; i<path.getLength();i++){
                if( path.getAt(i) == event.latLng){
                    path.removeAt(i)
                }
            }
        });
        console.log(sections) 
        }    
    }
    if(redirectToSectionDetails ==true){
        return <Redirect to="/sectiondetails"/>
    }
    if(redirectManualTransect==true){
        return <Redirect to='/transect'/>
      }


    //get Live location of user
    let liveLocation = null;
    const options ={
        enableHighAccuracy : true
    };
    //first add current location of user to the polyline then add the prograssive ones 
    const trackUser = (position)=>{
        //console.log(position.coords.latitude);
        console.log(position)
        let liveposition = new google.maps.LatLng({lat: position.coords.latitude, lng: position.coords.longitude});
        setTimeout( addLatLng, 60000, liveposition);
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
                   handler(){
                       setManualTransect(true)
                   }
                  }
                ]} />
        
        <IonAlert
                isOpen={emptySection}
                onDidDismiss={() => setEmptySections(false)}
                cssClass='submitalert'
                header={'Empty sections'}
                message={'Enter a section first'}
                buttons={[
                  {
                    text: 'OK',
                   
                  }
                ]} />

    </div>
    </IonContent>
    </IonPage></>
    
  );
};

//export default connect(mapStateToProps)(AutomaticTransect);
export default AutomaticTransect;

function e(e: any): ((reason: any) => PromiseLike<never>) | null | undefined {
  throw new Error('Function not implemented.');
}
