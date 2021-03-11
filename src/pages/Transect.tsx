import React, { useState } from 'react';
import '../components/ExploreContainer.css';
import {IonAlert, IonButton, IonContent, IonHeader, IonIcon, IonLabel, IonPage, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs} from '@ionic/react';
import { useDispatch } from 'react-redux';
import { Loader } from '@googlemaps/js-api-loader';
import { home, walk, leaf, navigate, ellipsisHorizontal } from 'ionicons/icons';
import { Section } from '../Reducers/RouteStartReducer';

interface ContainerProps { 
  
}

const Transect: React.FC<ContainerProps> = () => {
    //get user current position
    const [latitude, setlat] = useState(0)
    const [long,  setlong] = useState(0)  
    const[filled, setfilled] = useState(false)

    const [sections, setSections] = useState([]);
    const [currentState, setState]= useState({currentDistance:0, startSection:0});
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
    
    
    //button controls added on top of map
    const buttonsControl =(div:Element, map: google.maps.Map)=>{
        //the buttons to be included on the map
        const addSectionButton = document.createElement("button");
        addSectionButton.innerHTML = "Add Section";
        addSectionButton.style.position = "relative";
        addSectionButton.style.top = "10%";
        addSectionButton.style.padding="20% 15%";
        addSectionButton.style.backgroundColor = "white";
        addSectionButton.style.color = "black";
        const buttonDiv = document.createElement("div")
        buttonDiv.appendChild(addSectionButton)
        
        div.appendChild(addSectionButton);

        addSectionButton.addEventListener("click",saveSection)
        
    }
    const loader = new Loader({
        apiKey: "AIzaSyAmfNAhG-WbTTCN-7JmHApcvr9e1tYirGw"
      });
      console.log("here")
      let map: google.maps.Map;
      let poly: google.maps.Polyline;
      loader.load().then(() => {
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
          map.addListener("click", addLatLng);

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
      });

      
      function addLatLng(event: google.maps.MapMouseEvent) {
        const path = poly.getPath();
      
        // Because path is an MVCArray, we can simply append a new coordinate
        // and it will automatically appear.
        path.push(event.latLng);
      
        // Add a new marker at the new plotted point on the polyline.
        /*new google.maps.Marker({
          position: event.latLng,
          title: "#" + path.getLength(),
          map: map,
        });*/
    }

    //add button to set up the sections
    //go to allow for details on habitat and land use 
    //to be updated
    //finish setting up transect
    function saveSection(event: any){        
        const path = poly.getPath()
        const distance = google.maps.geometry.spherical.computeLength(path);

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
            
    }
  return (
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

    </div>
    </IonContent>
    </IonPage>
    
  );
};

export default Transect;
