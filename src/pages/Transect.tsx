import React, {  useEffect, useState } from 'react';
import '../components/ExploreContainer.css';
import {IonAlert,IonContent, IonHeader,  IonPage, IonRouterOutlet} from '@ionic/react';
import { connect, useDispatch } from 'react-redux';
import { Loader } from '@googlemaps/js-api-loader';
import { Section } from '../Reducers/SectionsReducer';
import { Redirect, Route } from 'react-router';
import SectionDetails from './SectionDetails';
import { setSections } from '../Actions/Transect';
interface ContainerProps { 
  sections:any[]
}

const Transect: React.FC<ContainerProps> = (props) => {
    //const [sections, changeSections] = useState(Section[]);
    const [emptySection, setEmptySections]= useState(false);
    const [redirectToSectionDetails, setRedirectToDetails] = useState(false);
    //prompts user to scroll to the position if navigation
    //fails
    const [showScrollToPos, setScrollToPos] = useState(false)
    //button controls added on top of map
    console.log("SECTIONS", props.sections)
    let list:  any[] = []
    let checkSections:any[] = []
    
    for(const prop in props.sections){
      list = props.sections[prop]
      checkSections = props.sections[prop]
      //sections=props.sections[prop]
    }
    let v = list.length;
    //sections = list
    let sections:Section[]|any = list
    /*if(list){
      console.log("something")
      sections = list
    }
    */
    
    console.log(list)
    /*for(let i=0;i<list.length;i++){
      //console.log(list[i].positions)
    }*/
   
    const buttonsControl =(div:Element, map: google.maps.Map)=>{
        //the buttons to be included on the map
        const addSectionButton = document.createElement("button");
        addSectionButton.innerHTML = "Add Section";
        addSectionButton.style.padding="8% 10%";
        addSectionButton.style.backgroundColor = "white";
        addSectionButton.style.color = "black";

        
        
        const fillSectionButton = document.createElement("button");
        fillSectionButton.innerHTML = "Submit Sections";
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
    let marker : google.maps.Marker
    let polylines:google.maps.Polyline[]=[];
    let markers:google.maps.Marker[] = [];
    function removePoint(event: google.maps.MapMouseEvent){
      const path = poly.getPath();
      console.log(path)
      let pathlist = path.getArray();
      let found = false;
      console.log(markers);
      for (let i=0; i<path.getLength();i++){
          if( path.getAt(i) == event.latLng){
            found = true;
              path.removeAt(i)
              
              if(i==0){
                //check if the path has another point
                if(path.getLength()>0){
                  console.log("Trying to move"+polylines.length );
                  sections[polylines.length] = new Section(google.maps.geometry.spherical.computeLength(path), 
                     "0", [],[],path.getArray());
                   
                  markers[polylines.length].setPosition(path.getAt(i))
                }else{
                  sections.splice(polylines.length, 1);
                  markers[polylines.length].setMap(null)
                }
                //if not remove the marker
              }else{
                sections[polylines.length] = new Section(google.maps.geometry.spherical.computeLength(path), 
                "0", [],[],path.getArray());
              }
          }
      }
      if (!found){
        for(let i=0; i<polylines.length;i++){
          for (let j=0; j<polylines[i].getPath().getLength();j++){
            if( polylines[i].getPath().getAt(j) == event.latLng){
              console.log("current polyline", polylines[i].getPath().getLength())
                found=true;
                polylines[i].getPath().removeAt(j)
                
                if(j==0){
                  //check if the path has another point
                  if(polylines[i].getPath().getLength()>0){
                    sections[i] = new Section(google.maps.geometry.spherical.computeLength(polylines[i].getPath()), 
                     "0", [],[],polylines[i].getPath().getArray());
                    console.log("Trying to move"+polylines.length );
  
                    markers[i].setPosition(polylines[i].getPath().getAt(i))
                  }else{
                    //array.splice(index, 1);
                    sections.splice(i, 1);
                    markers[i].setMap(null)
                  }
                }else{
                  sections[i] = new Section(google.maps.geometry.spherical.computeLength(polylines[i].getPath()), 
                  "0", [],[],polylines[i].getPath().getArray());
                }
            }
        }
        }
      }
      console.log("AMENDED SECTIONS", sections)
  }
  
      loader.load()
      .then(() => {
          console.log("map should be here")
          if(document.getElementById("map") ){
            map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
              //center: { lat: lat, lng: lng },
              zoom: 15,
            }); 
          
          
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
               let  initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                map.setCenter(initialLocation);
            });
        } 
        if(list){
          if(list.length>0){
            for(let i=0;i<list.length;i++){
              let colors = ['red', 'maroon', 'blue','silver', 'yellow','olive', 'lime', 'purple', 'orange', 'green',
          'pink', 'brown', 'coral', 'magenta', 'tan']
          let randomColor =Math.floor(Math.random()*colors.length-1)
            poly = new google.maps.Polyline({
              path: list[i].positions,
              strokeColor: colors[randomColor],
              strokeOpacity: 1.0,
              strokeWeight: 3,
              editable:true
            });
            poly.setMap(map);
            marker = new google.maps.Marker({
              draggable:true,
              position: poly.getPath().getAt(0),
              title: "#" + sections.length,
              map: map,
            });
            poly.addListener("dblclick", removePoint);
            /*
            marker.addListener("click", () => {
              infowindow.open(map, marker);
            });*/
            polylines.push(poly)
            markers.push(marker)
            nameSections(markers)
          }
          }else{
            poly = new google.maps.Polyline({
              strokeColor: "#000000",
              strokeOpacity: 1.0,
              strokeWeight: 3,
              editable:true
            });
            poly.setMap(map);
          }
        }else{
          poly = new google.maps.Polyline({
            strokeColor: "#000000",
            strokeOpacity: 1.0,
            strokeWeight: 3,
            editable:true
          });
          poly.setMap(map);
        }
        
        // Create the DIV to hold the control and call the CenterControl()
        // constructor passing in this DIV.
        const buttonsDiv = document.createElement("div");
        buttonsDiv.id = "buttonsDiv";
        buttonsControl(buttonsDiv, map);
    
        map.controls[google.maps.ControlPosition.TOP_CENTER].push(buttonsDiv);
          // Add a listener for the click event
          map.addListener("click", addLatLng);
    
          //remove an edge of the transect when setting up
          poly.addListener("dblclick", removePoint);
      }});
        
      
    function addLatLng(event: google.maps.MapMouseEvent) {
      console.log(polylines);
        const path = poly.getPath();
      
        // Because path is an MVCArray, we can simply append a new coordinate
        // and it will automatically appear.
        path.push(event.latLng);
        
        
    }

    //add button to set up the sections
    //ensure that a section has been entered
    //go to allow for details on habitat and land use 
    //to be updated
    //finish setting up transect
    const dispatch = useDispatch()
    const addSections =()=>{
      //if(list){
        console.log("Number of sections in the beginning", v)
        if(v!=sections.length){
          saveSection()
          console.log("Adding extra sections")
        }
        console.log("SECTIONS AT THE END", sections)
      //}
      //saveSection()
        //check there is a section added
        if(sections.length==0){
            setEmptySections(true);
        }else{
            dispatch(setSections(sections));
            setRedirectToDetails(true);
        }
    }

    const nameSections=(markers:google.maps.Marker[])=>{
      for(let i=0;i<markers.length;i++){
        let contentString = '<div id="dark-text"><p>Section '+(i+1) +'</p></div>'
        const infowindow = new google.maps.InfoWindow({
          content: contentString,
        });  
        markers[i].addListener("click", () => {
          infowindow.open(map, markers[i]);
        });
      }
    }
    function saveSection(){  
      console.log("SECTIONS AT START", list.length) 
        const path = poly.getPath()
        const distance = google.maps.geometry.spherical.computeLength(path);
        if(sections.length==0){
          /*let contentString = '<div id="dark-text"><p>Section '+(sections.length+1) +'</p></div>'
          const infowindow = new google.maps.InfoWindow({
            content: contentString,
          });  */
          marker = new google.maps.Marker({
            draggable:true,
            position: path.getAt(0),
            title: "#" + sections.length,
            map: map,
          });
          /*
          marker.addListener("click", () => {
            infowindow.open(map, marker);
          });*/
          markers.push(marker);
        }
        polylines.push(poly);
        //ensure that an actual section has bee entered
        if(path.getArray().length>0){
        let section: Section;
        section=new Section(distance, "0", [],[],path.getArray())  
        if(v!=sections.length||sections.length==0){
          sections.push(section)
        }      
        console.log("SECTIONS", sections)
        //append last position to new polyline to join them all
        let last = path.getArray()[path.getArray().length-1]
          // Add a new marker at the new plotted point on the polyline.
         /* let contentString = '<div id="dark-text"><p>Section '+(sections.length+1) +'</p></div>'
          const infowindow = new google.maps.InfoWindow({
            content: contentString,
          });  */
        marker = new google.maps.Marker({
          draggable:true,
          position: last,
          title: "#" + sections.length,
          map: map,
        });
        /*marker.addListener("click", () => {
          infowindow.open(map, marker);
        });*/
        markers.push(marker);
        //generate different colors for the different poylines
        let colors = ['red', 'maroon', 'blue','silver', 'yellow','olive', 'lime', 'purple', 'orange', 'green',
        'pink', 'brown', 'coral', 'magenta', 'tan']
        let randomColor =Math.floor(Math.random()*colors.length-1)
        console.log(polylines);
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
        poly.addListener("dblclick", removePoint);
        } 
        nameSections(markers) 
    }
    console.log(polylines);
    if(redirectToSectionDetails ==true){
        return <Redirect to="/sectiondetails"/>
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
const mapStateToProps = function(state: any) {
  return {
    sections:state.sections,
  }
}

export default connect(mapStateToProps)(Transect);/*
export default Transect;*/
