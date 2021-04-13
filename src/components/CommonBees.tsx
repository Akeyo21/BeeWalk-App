import React, { useEffect, useState } from 'react';
import { IonCol,  IonRow, IonFab, IonFabButton, IonIcon, IonSlide, IonSlides} from '@ionic/react';

import "../pages/Default.css";
import { add, addCircle, removeCircle, removeOutline } from 'ionicons/icons';

import data from '../beeInfo/species_set.json';
import bee_data from  '../beeInfo/bee_data.json';
/* BeeCastCount - Template for the body of the DuringWalk page 
that collects data during the walk 
              - Contains the counter of each bee cast 
*/
interface ContainerProps {  
   
}

const CommonBees: React.FC<ContainerProps> = (props) => {
    const slideOpts = {
        initialSlide: 1,
        speed: 400
      };
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
    //const [commonBees, setbees] = useState([])
    const [notInUK, setnotInUK] = useState(false)
    //check if current location is in the UK or not
    /*const giveIndex=(lat:number, long:number)=>{
      try{
        inUK(lat, long)
        //setbees(bee_data[20][10][6].filter((species: number)=>species>0&&species!=26))
      }
      catch(error){
        setnotInUK(true)
      }
    }*/
    var today = new Date();

/*useEffect(()=>{
    navigator.geolocation.getCurrentPosition(function(position) {
    
        let long = position.coords.longitude
        let lat = position.coords.latitude
        /*console.log(typeof long)
        console.log("Latitude is :", typeof position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
        try{
          inUK(lat, long)
          setbees(bee_data[latLongIndex(lat, latStart, interval)][latLongIndex(long, longStart, interval)][today.getMonth()].filter((species: number)=>species>0&&species!=26))
        }
        catch(error){
          setnotInUK(true)
          setbees([])
        }
      });
      return function cleanup(){
          setnotInUK(false);
          setbees([]);
      }
});*/
let commonBees:number[] = [];
navigator.geolocation.getCurrentPosition(function(position) {
    
    let long = position.coords.longitude
    let lat = position.coords.latitude
    /*console.log(typeof long)
    console.log("Latitude is :", typeof position.coords.latitude);
    console.log("Longitude is :", position.coords.longitude);*/
    try{
      inUK(lat, long)
      console.log(typeof bee_data);     
      let beelist =  Object.values(bee_data);
      let selected:number[] = beelist[latLongIndex(lat, latStart, interval)][latLongIndex(long, longStart, interval)][today.getMonth()]
    
     commonBees = selected.filter((species: any)=>species>0&&species!=26)
    }
    catch(error){    
      setnotInUK(true)
      //setbees([]) 
    }
});

  
    
  return ( 
      <>  
      {notInUK? <h4 className="black">Common bees not featured in your country</h4> 
              : commonBees.length==0? <h4 className="black">Not as many bees at this time of year</h4> :
                <IonSlides pager={true} options={slideOpts} className="black">
                  {commonBees.map((species:any)=>(
                  <IonSlide>
                  <h4>{data[species]}</h4>
                  </IonSlide>
                
                  
              ))}
              </IonSlides>}
            </>
            );
    
        };
        
export default CommonBees;