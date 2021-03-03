import { IonContent, IonHeader, IonPage, IonButton, IonRouterOutlet , IonTabs, IonTabBar,IonTabButton,
IonIcon, IonLabel, IonBadge, IonSlides, IonSlide, IonText} from '@ionic/react';
import { calendar, personCircle, map, informationCircle, ellipsisHorizontal, home, leaf, navigate, walk } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
/*import './Home.css';*/
import '../components/ExploreContainer.css';
import '../components/LoginPage.css';
import { useDispatch } from 'react-redux';
import { resetWalks } from '../Actions/Walks';

import data from '../beeInfo/species_set.json';
import bee_data from  '../beeInfo/bee_data.json';
/**/
const Postlogin: React.FC = () => {
  const slideOpts = {
    initialSlide: 1,
    speed: 400
  };
const [currentLong, setLong] = useState(0)
const [ currrentLat, setLat] = useState(0)
  //check if current location is in the UK
  const inUK = (lat:number, long:number)=>{
    if(lat<40 || lat>60){
        throw new Error("Not in the UK-lat")
    }else if (long<-10|| long>20){
        throw new Error("Not in the UK- long")
    }else{
        return "In the UK"
    }
  }


//change index
const latLongIndex = (pos:any, start:number, intervals:number)=>{
    let difference = pos - start;
    let division = difference/0.5;
    return division-1;
}
const latStart = 40
const longStart = -10
const interval = 0.5
const [commonBees, setbees] = useState([])
const [notInUK, setnotInUK] = useState(false)
//check if current location is in the UK or not
const giveIndex=(lat:number, long:number)=>{
  try{
    inUK(lat, long)
    //setbees(bee_data[20][10][6].filter((species: number)=>species>0&&species!=26))
  }
  catch(error){
    setnotInUK(true)
  }
}
var today = new Date();
navigator.geolocation.getCurrentPosition(function(position) {
  setLat(position.coords.latitude)
  setLong(position.coords.longitude)
  let long = position.coords.longitude
  let lat = position.coords.latitude
  /*console.log(typeof long)
  console.log("Latitude is :", typeof position.coords.latitude);
  console.log("Longitude is :", position.coords.longitude);*/
  try{
    inUK(lat, long)
    setbees(bee_data[latLongIndex(lat, latStart, interval)][latLongIndex(long, longStart, interval)][today.getMonth()].filter((species: number)=>species>0&&species!=26))
  }
  catch(error){
    setnotInUK(true)
    setbees([])
  }
});

  //giveIndex(currrentLat, currentLong)
  

 
  const dispatch = useDispatch()
 const reset=()=>{
   dispatch(resetWalks())
 }
  return (
    
    <><>
     </>
      <IonPage>
        <IonHeader>
        </IonHeader>
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            
          </IonHeader>
          
          <div className="container">
            
              <div className="wholepage" >
              <IonTabBar slot="bottom" color="warning" className="tabs">
            <IonTabButton tab="home" href="/frontpage">
                <IonIcon icon={home} />
                <IonLabel>Home</IonLabel>
              </IonTabButton>
      
              <IonTabButton tab="walks" href="/walks">
                <IonIcon icon={walk} />
                <IonLabel>My walks</IonLabel>
              </IonTabButton>
              
              <IonTabButton tab="sites" href="/mysites">
                <IonIcon icon={leaf} />
                <IonLabel>My Sites</IonLabel>
              </IonTabButton>
              
              <IonTabButton tab="terms" href="/terms">
                <IonIcon icon={navigate} />
                <IonLabel>Explore</IonLabel>
              </IonTabButton>
              
              <IonTabButton tab="more" href="/more">
                <IonIcon icon={ellipsisHorizontal} />
                <IonLabel>More</IonLabel>
              </IonTabButton>
            </IonTabBar>
            {notInUK? <h4 className="black">Common bees not featured in your country</h4> 
              : commonBees.length==0? <h4 className="black">Not as many bees at this time of year</h4> :
                <IonSlides pager={true} options={slideOpts} className="black">
                  {commonBees.map((species:any)=>(
                  <IonSlide>
                  <h4>{data[species]}</h4>
                  </IonSlide>
                
                  
              ))}
              </IonSlides>}
            
                <div id="move">
                
                    <IonButton routerLink="/start/prewalk"
                    color="warning" size="large" className="buttons" shape="round" expand="block">
                        Start Walk
                    </IonButton>

                    <IonButton routerLink="/commonbees"
                    color="warning" size="large" className="buttons" shape="round" expand="block">
                        Bees in my area
                    </IonButton>

                    
          <IonButton onClick={()=>(reset())}>Reset Walks</IonButton>
                </div>
                
                
              </div>
          </div>
         
        </IonContent>
      </IonPage></>
  );
};

export default Postlogin;
