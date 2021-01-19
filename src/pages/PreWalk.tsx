import React, { constructor, useEffect, useState } from 'react';
import '../components/ExploreContainer.css';
import { IonBackButton, IonButton,  IonButtons,  IonCol,  IonContent, IonDatetime, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonList, IonLoading, IonPage, IonRouterOutlet, IonRow, IonText, IonToolbar } from '@ionic/react';
/*import '../components/LoginPage.css';*/
import './PreWalk.css';
import {Route} from 'react-router-dom';
import DuringWalk from './DuringWalk';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';
/*
    PreWalk - opens the first page containing details 
    required prior to starting the beewalk
*/
interface ContainerProps { 
}

const PreWalk: React.FC<ContainerProps> = (props) => {
    const [loading, setLoading] = useState(false)
    const[results, setResults] = useState<Object>()
    let options: NativeGeocoderOptions = {
        useLocale: true,
        maxResults: 5
    };
    
    const getLocation=async ()=>{
        const location = await Geolocation.getCurrentPosition()
        setLoading(false)
        const long = String(location.coords.longitude)
        const lat = String(location.coords.latitude)
        fetch("https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+long+"&exclude=hourly,daily&units=metric&appid=b5283a09cece585e260e8b686948e003")
      .then(res => res.json())
      .then(
        (result) => {
          setResults(result)
          if (results) console.log(results.current.temp)
          setIsLoaded(true);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
        return location
    }
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
const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
    
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var now = new Date()
    var time = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
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
            <IonLoading isOpen={loading} message="Filling form" onDidDismiss={()=>{setLoading(false)}}/>
                <form id="prewalkform">
                    <IonList>
                        <IonItem>
                        <IonLabel className="align-left"> Date </IonLabel>
                        <IonDatetime  value ={date} displayFormat="DD MM YYYY" placeholder="Select Date"  ></IonDatetime>
        
                        </IonItem>

                        <IonItem>
                        <IonLabel className="align-left">Start Time</IonLabel>
                        <IonDatetime display-format="h:mm A" picker-format="h:mm A" value={time}></IonDatetime>
        
                        </IonItem>

                        <IonItem>
                        <IonLabel className="align-left">Temp(Celsius)</IonLabel>
                        {isLoaded? <IonText>{results?.current.temp}</IonText>: <IonText>Checking Temperature</IonText>}
                        
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
