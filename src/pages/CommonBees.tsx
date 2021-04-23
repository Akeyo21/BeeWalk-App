import React, { useEffect, useState } from 'react';
import '../components/ExploreContainer.css';
import { IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRouterOutlet, IonRow, IonToolbar } from '@ionic/react';

import './Default.css';
import BeesInArea from '../components/BeesInArea';
import PreWalk from "../pages/PreWalk";
import {Route} from 'react-router-dom';
import { getBees } from '../beeInfo/Bees';
import data from '../beeInfo/species_set.json';

interface ContainerProps { 
}
/* CommonBees - page that shows the common bees in the are
*/
const CommonBees: React.FC<ContainerProps> = (props) => {
  const [commonBees, setbees] = useState([])
  const [notInUK, setnotInUK] = useState(false) 
  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(function(position) {
        
      let long = position.coords.longitude
      let lat = position.coords.latitude
      try{
      
      setbees(getBees(lat, long))
      }
      catch(error){   
        console.log(error) 
        setnotInUK(true)
      }
    })
  },[])
  console.log(commonBees)
  return (
    
    <><><IonRouterOutlet>
      <Route path="/start/prewalk" component={PreWalk} />
    </IonRouterOutlet></>
      <IonPage>
        <IonHeader>
        </IonHeader>
        <IonContent fullscreen>
          <IonHeader >
          </IonHeader>
          <div className="container">
          <IonButton href="/"className="back whitebackground" >Back</IonButton>
         
        <div className="wholepage "> 
        <div className="beelist">
        {notInUK? <h4 className="black">Common bees not featured in your country</h4> 
              : commonBees.length==0? <h4 className="black">Not as many bees at this time of year</h4> :
                  commonBees.map((species:any, index:number)=>(
                  <BeesInArea key={index} name={data[species]}/>               
                  
              ))}
        </div>
           
        </div>
        </div>
          
          
        </IonContent>
      </IonPage></>
    
    
  );
};

export default CommonBees;
