import React, { constructor, useEffect, useState } from 'react';
import '../components/ExploreContainer.css';
import { IonBackButton, IonButton,  IonButtons,  IonCol,  IonContent, IonDatetime, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonList, IonLoading, IonPage, IonRouterOutlet, IonRow, IonSelect, IonSelectOption, IonText, IonToolbar } from '@ionic/react';
/*import '../components/LoginPage.css';*/
import './PreWalk.css';
import {Route} from 'react-router-dom';
import DuringWalk from './DuringWalk';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';
import { createSecureContext } from 'tls';
import MapWalk from './MapWalk';

/*
    PreWalk - opens the first page containing details 
    required prior to starting the beewalk
*/
interface ContainerProps { 
}

const PreWalk: React.FC<ContainerProps> = (props) => {
    const [loading, setLoading] = useState(true)
    const[results, setResults] = useState<Object>()
    const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState({});
    
    /*const getLocation=async ()=>{
        const location = await Geolocation.getCurrentPosition()
        setLoading(false)
        const long = String(location.coords.longitude)
        const lat = String(location.coords.latitude)
        
        fetch("https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+long+"&exclude=hourly,daily&units=metric&appid=ffadcef2f1c452c320abcd1bb92a3891")
      .then(res => res.json())
      .then(
        (result) => {
            setResults(result);
            if(result){
                console.log(typeof(result))
                setIsLoaded(false)
                console.log("not a value")
            }else{
                console.log("a value")
            setIsLoaded(true);
            }
          if (results) console.log(results.current)
          if(results==null) console.log("none")
          
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(false);
          setError(error);
        }
      )
        return location
    }
    getLocation()
    console.log(isLoaded)*/
    /*const weather =async()=>{
        const location = await Geolocation.getCurrentPosition()
        setLoading(false)
        const long = String(location.coords.longitude)
        const lat = String(location.coords.latitude)
        const result = await fetch("https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+long+"&appid=ffadcef2f1c452c320abcd1bb92a3891")
        return result
    }
    weather()*/
    
    useEffect(() => {
        const getLocation=async ()=>{
            const location = await Geolocation.getCurrentPosition()
        
        const long = String(location.coords.longitude)
        const lat = String(location.coords.latitude)
        fetch("https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+long+"&exclude=hourly,daily&units=metric&appid=6d837b2be67e2011e2992f53bd4de120")
        .then(res => res.json())
          .then(
            (result) => {
              if(result){
                  setLoading(false)
                  setIsLoaded(true)
              }else{
              setIsLoaded(true);
              }
              setResults(result);
              if (result) console.log(result.current)
              else console.log("where?")
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              setIsLoaded(false);
              setError(error);
            }
          )
        }
        getLocation()
      }, [])
    /*const getAddress=async ()=>{
        const location = (await getLocation()).coords
        NativeGeocoder.reverseGeocode(location.latitude, location.longitude, options)
      .then((result: NativeGeocoderResult[]) => {
          console.log(JSON.stringify(result[0])+" Here")
        return result[0]})
      /*.then((result: NativeGeocoderResult[]) => console.log(result[0])+" Here")

      .catch((error: any) => console.log(error));
    }
    getAddress()*/
    const getSunnyValue = (cloudiness: number)=>{
      if (cloudiness>70) return "cloudy"
      else if(cloudiness<30) return "sunny"
      else return "sunny/cloudy"
      
    }

    const getWindSpeed=(windspeed:number)=>{
      if (windspeed<0.3) return "0"
      else if (windspeed<1.4) return "1"
      else if (windspeed <3.1) return "2"
      else if (windspeed<5.3) return "3"
      else if (windspeed<7.8) return "4"
      else if (windspeed<10.6) return "5"
      else if (windspeed<13.6) return "6"
      else return "not available"
    }
    
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var now = new Date()
    var time = new Date().getHours() + ":" + new Date().getMinutes()+":"+new Date().getSeconds();
    var all = new Date(date + " "+time)
    console.log(all.toISOString())
  return (
    <><><IonRouterOutlet>
        <Route path="/start/duringwalk" component={DuringWalk} />
        <Route path="/start/duringwalk/map" component={MapWalk} />

    </IonRouterOutlet></>
      <IonPage>
        <IonHeader>
        </IonHeader>
        <IonContent fullscreen>
            
        <IonHeader >
        </IonHeader>

        <div className="container">
            <div className="wholepage">
            <IonBackButton defaultHref="/frontpage" icon="buttonIcon" text="BACK" className="ion-float-left" color="dark"/><br/>
            <IonLoading isOpen={loading} message="Getting weather info" onDidDismiss={()=>{setLoading(false)}}/>
                <form id="prewalkform" action="/start/map">

                    <IonList>
                      <IonItem>
                        <IonInput type="text" value=" Enter Recorder's name" font-weight="bold"></IonInput>
                      </IonItem>

                      <IonItem>
                        <IonInput type="text" value=" Choose the transect being walked" font-weight="bold"></IonInput>
                      </IonItem>
                        <IonItem>
                        <IonLabel className="align-left"> Date </IonLabel>
                        <IonDatetime  value ={date} displayFormat="DD MM YYYY" placeholder="Select Date"  ></IonDatetime>
        
                        </IonItem>

                        <IonItem>
                        <IonLabel className="align-left">Start Time</IonLabel>
                        <IonDatetime display-format="h:mm A" picker-format="h:mm A" value={all.toISOString()}></IonDatetime>
        
                        </IonItem>

                        <IonItem >
                        <IonLabel className="align-left">Temp(Celsius)</IonLabel>
                        {isLoaded? <IonText>{results?.current.temp}</IonText>: <IonText>Checking Temperature</IonText>}
                        
                        </IonItem>

                        <IonItem >
                        <IonLabel className="align-left" >Sunshine</IonLabel>
                        {isLoaded?
                         <IonSelect interface="action-sheet" value={getSunnyValue(results?.current.clouds)}>
                         <IonSelectOption value="sunny">Sunny</IonSelectOption>
                          <IonSelectOption value="sunny/cloudy">Sunny/Cloudy</IonSelectOption>
                          <IonSelectOption value="cloudy">Cloudy</IonSelectOption>
                         </IonSelect>: 
                         <IonSelect interface="action-sheet" >
                         <IonSelectOption value="sunny">Sunny</IonSelectOption>
                          <IonSelectOption value="sunny/cloudy">Sunny/Cloudy</IonSelectOption>
                          <IonSelectOption value="cloudy">Cloudy</IonSelectOption>
                         </IonSelect>}

                         
                        
                        </IonItem>

                        <IonItem className="align-left">
                          <IonLabel>Wind Speed</IonLabel>
                        {isLoaded?
                         <IonSelect interface="action-sheet" value={getWindSpeed(results?.current.wind_speed)}>
                         <IonSelectOption value="0">Smoke rises vertically</IonSelectOption>
                          <IonSelectOption value="1">Sight smoke drift</IonSelectOption>
                          <IonSelectOption value="2">Wind felt on face, leaves rustle</IonSelectOption>
                          <IonSelectOption value="3">Leaves and twigs in slight motion</IonSelectOption>
                          <IonSelectOption value="4">Dust raised and small branches move</IonSelectOption>
                          <IonSelectOption value="5">Small trees in leaf beggin to sway</IonSelectOption>
                          <IonSelectOption value="6">Large branches move and trees sway</IonSelectOption>
                         </IonSelect>:
                         <IonSelect interface="action-sheet" >
                         <IonSelectOption value="0">Smoke rises vertically</IonSelectOption>
                          <IonSelectOption value="1">Sight smoke drift</IonSelectOption>
                          <IonSelectOption value="2">Wind felt on face, leaves rustle</IonSelectOption>
                          <IonSelectOption value="3">Leaves and twigs in slight motion</IonSelectOption>
                          <IonSelectOption value="4">Dust raised and small branches move</IonSelectOption>
                          <IonSelectOption value="5">Small trees in leaf beggin to sway</IonSelectOption>
                          <IonSelectOption value="6">Large branches move and trees sway</IonSelectOption>
                         </IonSelect>
                         }
                        </IonItem>
                    </IonList>
                    
                
                    <IonButton 
                    color="warning" size="large" className="buttons" shape="round" expand="block" href="/map">
                        Start Walk
                    </IonButton>
                </form>
                    
                </div>
            </div>
          
          
        </IonContent>
      </IonPage></>
    
    
  );
};

export default PreWalk;
