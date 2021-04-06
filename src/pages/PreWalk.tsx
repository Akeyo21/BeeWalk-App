import React, {  useEffect, useState } from 'react';
import '../components/ExploreContainer.css';
import { IonAlert, IonBackButton, IonButton,  IonButtons,  IonCol,  IonContent, IonDatetime, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonList, IonLoading, IonPage, IonRouterOutlet, IonRow, IonSelect, IonSelectOption, IonText, IonToolbar } from '@ionic/react';
/*import '../components/LoginPage.css';*/
import './PreWalk.css';
import {Redirect, Route} from 'react-router-dom';
import DuringWalk from './DuringWalk';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';
import { createSecureContext } from 'tls';
import MapWalk from './MapWalk';
import { Walk } from '../Reducers/WalksBeforeReducer';
import { connect, useDispatch } from 'react-redux';
import { setWalk } from '../Actions/Walks';
import UpdatedMapWalk from './Map';
/*
    PreWalk - opens the first page containing details 
    required prior to starting the beewalk
*/
interface ContainerProps { 
  transects:[]
}

const PreWalk: React.FC<ContainerProps> = (props) => {
  const [addTransect, setAddTransect] = useState(false);
    const [loading, setLoading] = useState(true)
    const[results, setResults] = useState<Object>()
    const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const[newTransect, setUpTransect]= useState(false);
  let transectslist: any[] =[]
  for(const property in props.transects){
   transectslist = props.transects[property]
 }
    
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
    const getSunnyValue = (cloudiness: number)=>{
      if (cloudiness>70) return "cloudy"
      else if(cloudiness<30) return "sunny"
      else return "sunny/cloudy"
      
    }
    const getWindSpeed=(windspeed:number)=>{
      if (windspeed<0.3) return "Smoke rises vertically"
      else if (windspeed<1.4) return "Sight smoke drift"
      else if (windspeed <3.1) return "Wind felt on face, leaves rustle"
      else if (windspeed<5.3) return "Leaves and twigs in slight motion"
      else if (windspeed<7.8) return "Dust raised and small branches move"
      else if (windspeed<10.6) return "Small trees in leaf beggin to sway"
      else if (windspeed<13.6) return "Large branches move and trees sway"
      else return "not available"
    }
    
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = new Date().getHours() + ":" + new Date().getMinutes()+":"+new Date().getSeconds();
    var hr = new Date().getHours() + ":" + new Date().getMinutes()
    var all = new Date(date + " "+time)
    console.log(all.toISOString())
     
    ///confirming form submission details
    //submitting data to the store
    const [showAlert, setShowAlert] = useState(false)
    const [showTransectAlert, setShowTransectAlert] = useState(false)

    //get data from form
    //check if the data is supplied
    //recorder name
    let recorder:string
    const getRecorder =(value:string)=>{
      recorder = value
    }

    //transect
    let transect:number
    const getTransect=( transectEntered:number)=>{
      transect = transectEntered
    }

    //temp
    let temp:number
    const getTemp=( temperature:number)=>{
      temp = temperature
    }

    //sunshine
    let sunshine:string
    const getSunshine=( sunshineEntered:string)=>{
      sunshine = sunshineEntered
    }

    //windspeed
    let windspeed:string
    const getWindSpeedEntered=( speed:string)=>{
      windspeed = speed
      console.log(windspeed)
    }
    const [redirectToMap, setRedirectToMap] = useState(false)
 const dispatch = useDispatch()
    const addWalkDataToStore=()=>{
      console.log("Transect ", transect)
      if (recorder){
        if(transect){
          if(temp && sunshine &&windspeed){
          dispatch(setWalk(new Walk(recorder, (transect-1),
             date, hr, temp,sunshine, 
             windspeed)))
          
          
          }else{
            dispatch(setWalk(new Walk(recorder, (transect-1),
              date, hr,results?.current.temp,getSunnyValue(results?.current.clouds), 
              getWindSpeed(results?.current.wind_speed))))
          }
          setRedirectToMap(true)
        }else{
          setShowTransectAlert(true)
          
        }
      }else{
        setShowAlert(true)
        
      }
    }
    if(redirectToMap==true){      
      return <Redirect to='/mapwalk'/>
    }
    if(newTransect==true){
      return <Redirect to='/mysites/add'/>
    }
   
  return (
    <><><IonRouterOutlet>
        <Route path="/start/duringwalk" component={DuringWalk} />
        <Route path="/mapwalk" component={UpdatedMapWalk} />

    </IonRouterOutlet></>
      <IonPage>
        <IonHeader>
        </IonHeader>
        <IonContent fullscreen>
            
        <IonHeader >
        </IonHeader>

        <div className="container">
            <div className="wholepage">
            <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          cssClass='my-custom-class'
          header={"Recorder missing"}
          message={"Enter the recorder's name"}
          buttons={['OK']}
        />

<IonAlert
          isOpen={showTransectAlert}
          onDidDismiss={() => setShowTransectAlert(false)}
          cssClass='my-custom-class'
          header={"Transect Missing"}
          message={"Enter the transect being walked"}
          buttons={['OK']}
        />

<IonAlert
          isOpen={addTransect}
          onDidDismiss={() => setAddTransect(false)}
          cssClass='my-custom-class'
          header={"No listed transects"}
          message={"Enter a new transect"}
          buttons={[
            {
              text: 'OK',
              handler:()=>{
                setUpTransect(true)}
              
            },
            {
              text: 'Cancel',
              role: 'cancel'
            }
          ]}
        />
            <IonBackButton defaultHref="/frontpage" icon="buttonIcon" text="BACK" className="ion-float-left" color="dark"/><br/>
            <IonLoading isOpen={loading} backdrop-dismiss message="Getting weather info" onDidDismiss={()=>{setLoading(false)}} duration={8000}/>
                <form id="prewalkform" action="/start/map">

                    <IonList>
                      <IonItem>
                        <IonInput type="text" placeholder=" Enter Recorder's name" font-weight="bold" onIonInput={(e: any) => getRecorder(e.target.value)}></IonInput>
                      </IonItem>

                      <IonItem>
                      {transectslist.length==0?
                        <IonLabel onClick={()=>(setAddTransect(true))}>Choose Transect</IonLabel>:
                        <><IonLabel>Choose Transect</IonLabel>
                        <IonSelect interface="action-sheet" onIonChange={(e: any) => getTransect(e.target.value)}>
                          {transectslist.map((transect, index) => (
                            <IonSelectOption key={index} value={index + 1}>{transect.name}</IonSelectOption>
                          ))}
                        </IonSelect></>
                        }
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
                        {isLoaded? <IonInput  className="move-right"onIonInput={(e: any) => getTemp(e.target.value)}>{results?.current.temp}</IonInput>: <IonText>Checking Temperature</IonText>}
                        
                        </IonItem>

                        <IonItem >
                        <IonLabel className="align-left" >Sunshine</IonLabel>
                        {isLoaded?
                         <IonSelect interface="action-sheet" value={getSunnyValue(results?.current.clouds)}
                          onIonChange={(e: any) => getSunshine(e.target.value)}>
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
                         <IonSelect interface="action-sheet" value={getWindSpeed(results?.current.wind_speed)}
                         onIonChange={(e: any) => getWindSpeedEntered(e.target.value)}>
                         <IonSelectOption value="Smoke rises vertically">Smoke rises vertically</IonSelectOption>
                          <IonSelectOption value="Sight smoke drift">Sight smoke drift</IonSelectOption>
                          <IonSelectOption value="Wind felt on face, leaves rustle">
                            Wind felt on face, leaves rustle
                            </IonSelectOption>
                          <IonSelectOption value="Leaves and twigs in slight motion">
                            Leaves and twigs in slight motion
                            </IonSelectOption>
                          <IonSelectOption value="Dust raised and small branches move">
                            Dust raised and small branches move
                            </IonSelectOption>
                          <IonSelectOption value="Small trees in leaf beggin to sway">
                            Small trees in leaf beggin to sway
                            </IonSelectOption>
                          <IonSelectOption value="Large branches move and trees sway">
                            Large branches move and trees sway
                            </IonSelectOption>
                         </IonSelect>:
                         <IonSelect interface="action-sheet" >
                         <IonSelectOption value="Smoke rises vertically">Smoke rises vertically</IonSelectOption>
                          <IonSelectOption value="Sight smoke drift">Sight smoke drift</IonSelectOption>
                          <IonSelectOption value="Wind felt on face, leaves rustle">
                            Wind felt on face, leaves rustle
                            </IonSelectOption>
                          <IonSelectOption value="Leaves and twigs in slight motion">
                            Leaves and twigs in slight motion
                            </IonSelectOption>
                          <IonSelectOption value="Dust raised and small branches move">
                            Dust raised and small branches move
                            </IonSelectOption>
                          <IonSelectOption value="Small trees in leaf beggin to sway">
                            Small trees in leaf beggin to sway
                            </IonSelectOption>
                          <IonSelectOption value="Large branches move and trees sway">
                            Large branches move and trees sway
                            </IonSelectOption>
                         </IonSelect>
                         }
                        </IonItem>
                    </IonList>
                    
                
                    <IonButton 
                    color="warning" size="large" className="buttons" shape="round" expand="block" onClick={()=>(addWalkDataToStore())}>
                        Start Walk
                    </IonButton>
                </form>
                    
                </div>
            </div>
          
          
        </IonContent>
      </IonPage></>
    
    
  );
};

const mapStateToProps = function(state: any) {
  return {
    transects:state.transects
  }
}
export default connect(mapStateToProps)(PreWalk);

//export default PreWalk;
