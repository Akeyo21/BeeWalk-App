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
    
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var now = new Date()
    var time = new Date().getHours() + ":" + new Date().getMinutes()+":"+new Date().getSeconds();
    var all = new Date(date + " "+time)
    console.log(all.toISOString())
  return (
    <><><IonRouterOutlet>
        <Route path="/start/duringwalk" component={DuringWalk} />
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
                <form id="prewalkform">
                    <IonList>
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
                         <IonSelect interface="popover" value={getSunnyValue(results?.current.clouds)}>
                         <IonSelectOption value="sunny">Sunny</IonSelectOption>
                          <IonSelectOption value="sunny/cloudy">Sunny/Cloudy</IonSelectOption>
                          <IonSelectOption value="cloudy">Cloudy</IonSelectOption>
                         </IonSelect>: 
                         <IonSelect interface="popover" value="not yet">
                         <IonSelectOption value="sunny">Sunny</IonSelectOption>
                          <IonSelectOption value="sunny/cloudy">Sunny/Cloudy</IonSelectOption>
                          <IonSelectOption value="cloudy">Cloudy</IonSelectOption>
                         </IonSelect>}
                        
                        </IonItem>
                    </IonList>
                    <IonGrid>
                        

                        <IonRow>
                            <IonCol size="10">
                                <IonInput className="input" type="text"  required placeholder="Recorder Name(Automatic)" font-weight="bold" placeholder-opacity="1"/> 
                            </IonCol>
                            
                            <IonCol size="2">
                                <IonButton color="light">Edit</IonButton>
                            </IonCol>
                        </IonRow>

                        <IonRow>
                            <IonCol size="10">
                                <IonInput className="input" type="text"  required placeholder="Site(Automatic)" font-weight="bold" placeholder-opacity="1"/> 
                            </IonCol>
                            
                            <IonCol size="2">
                                <IonButton color="light">Edit</IonButton>
                            </IonCol> 
                        </IonRow>

                        <IonRow>
                            <IonCol size="10">
                                <IonInput className="input" type="text"  required placeholder="Weather Conditions
                                (Automatic)" font-weight="bold" placeholder-opacity="1"/> 
                            </IonCol>
                            
                            <IonCol size="2">
                                <IonButton color="light">Edit</IonButton>
                            </IonCol>
                        </IonRow>
                        
                    </IonGrid>
                
                    <IonButton routerLink="/start/duringwalk"
                    color="warning" size="large" className="buttons" shape="round" expand="block">
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
