import React, { constructor, useEffect, useState } from 'react';
import '../components/ExploreContainer.css';
import { IonAlert, IonBackButton, IonButton,  IonButtons,  IonCol,  IonContent, IonDatetime, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonList, IonLoading, IonPage, IonRouterOutlet, IonRow, IonSelect, IonSelectOption, IonText, IonToolbar } from '@ionic/react';
/*import '../components/LoginPage.css';*/
import './PreWalk.css';
import {Redirect, Route} from 'react-router-dom';
import DuringWalk from './DuringWalk';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';
import { createSecureContext } from 'tls';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import {
    GoogleMaps,
    GoogleMap,
    GoogleMapsEvent,
    GoogleMapOptions,
    CameraPosition,
    MarkerOptions,
    Marker,
    Environment
  } from '@ionic-native/google-maps';
/*
    PreWalk - opens the first page containing details 
    required prior to starting the beewalk
*/
interface ContainerProps { 
  google: any
}

const MapWalk: React.FC<ContainerProps> = (props) => {
   const [map,setMap] = useState<GoogleMap>()
   /*const loadMap=()=>{
    /*Environment.setEnv({
        'API_KEY_FOR_BROWSER_RELEASE': 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDhPMb0EavEJE-Hb_bd3E3VmtzrkARXc7Q&callback=mapInit',
        'API_KEY_FOR_BROWSER_DEBUG': 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDhPMb0EavEJE-Hb_bd3E3VmtzrkARXc7Q&callback=mapInit'
      });
      let mapOptions: GoogleMapOptions = {
        camera: {
           target: {
             lat: 43.0741904,
             lng: -89.3809802
           },
           zoom: 18,
           tilt: 30
         }
      };

      setMap( GoogleMaps.create('map_canvas', mapOptions))

    let marker: Marker |undefined = map?.addMarkerSync({
      title: 'Ionic',
      icon: 'blue',
      animation: 'DROP',
      position: {
        lat: 43.0741904,
        lng: -89.3809802
      }
    });
    marker?.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      alert('clicked');
    });
   }
   loadMap()
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
            
                </div>
            </div>
          
          
        </IonContent>
      </IonPage></>
      <Map
      google={props.google}
      style={mapStyles}
      initialCenter={{
        lat: -1.2884,
        lng: 36.8233
      }} />*/

      const mapStyles = {
        width: '100%',
        height: '100%'
      };
      const [showAlert1, setShowAlert1] = useState(false);
      const [redirectHome, setRedirectHome] = useState(false);
      /*Change between pages when ok is clicked in alert*/
  if (redirectHome==true){
    return <Redirect to='/frontpage' />
  }
  return (
    <>
      <IonButton color="warning" size="large" className="buttons" shape="round" expand="block">Record with photo/video</IonButton>
      <IonButton color="warning" size="large" className="buttons" shape="round" expand="block">Record without photo/video</IonButton>
    <IonButton color="warning" size="large" className="buttons" shape="round" expand="block">Records entered</IonButton>
    <IonButton color="warning" size="large" className="buttons" shape="round" expand="block" onClick={() => setShowAlert1(true)}>
      Save Records
      </IonButton>
      <IonAlert
                isOpen={showAlert1}
                onDidDismiss={() => setShowAlert1(false)}
                cssClass='submitalert'
                header={'Submission'}
                message={'Do you wish to submit your data?'}
                buttons={[
                  {
                    text: 'OK',
                    handler:()=>{
                      setRedirectHome(true)
                    }
                  },

                  {
                    text: 'Cancel',
                    role: 'cancel'
                  }
                ]} />
      </>
  
    
  );
};
/*export default GoogleApiWrapper({
  apiKey: 'AIzaSyDhPMb0EavEJE-Hb_bd3E3VmtzrkARXc7Q'
})(MapWalk);*/
export default MapWalk;
