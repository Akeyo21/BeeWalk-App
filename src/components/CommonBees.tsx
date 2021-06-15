import React, { useEffect, useState } from 'react';
import { IonCol,  IonRow, IonFab, IonFabButton, IonIcon, IonSlide, IonSlides} from '@ionic/react';

import "../pages/Default.css";
import { add, addCircle, removeCircle, removeOutline } from 'ionicons/icons';
import {getBees} from '../beeInfo/Bees';
import data from '../beeInfo/species_set.json';
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
    const [commonBees, setbees] = useState([])
    const [notInUK, setnotInUK] = useState(false)   
 
  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(function(position) {
      
      let long = position.coords.longitude
      let lat = position.coords.latitude
      try{
        lat = 53.37
        long=-1.419
        console.log(lat, long)
        setbees(getBees(lat, long))
      }
      catch(error){   
        console.log(error) 
        setnotInUK(true)
      }
  }); 
  }, []) 
  console.log(commonBees)
  
    
  return ( 
      <>  
      {notInUK? <h4 className="black">Common bees not featured in your country</h4> 
              : commonBees.length==0? <h4 className="black">Not as many bees at this time of year</h4> :
                <IonSlides pager={true} options={slideOpts} className="black">
                  {commonBees.map((species:any, index:number)=>(
                  <IonSlide key={index}>
                  <h4 >{data[species]}</h4>
                  </IonSlide>
                
                  
              ))}
              </IonSlides>}
            </>
            );
    
        };
        
export default CommonBees;