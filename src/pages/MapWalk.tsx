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
/*import { Map, GoogleApiWrapper } from 'google-maps-react';*/
import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'
import Records from './RecordsEntered'
import "leaflet/dist/leaflet.css";
import {
    GoogleMaps,
    GoogleMap,
    GoogleMapsEvent,
    GoogleMapOptions,
    CameraPosition,
    MarkerOptions,
    /*Marker,*/
    Environment
  } from '@ionic-native/google-maps';
import L from 'leaflet';

    /*PreWalk - opens the first page containing details 
    required prior to starting the beewalk
*/
interface ContainerProps { 
  google: any
}

const MapWalk: React.FC<ContainerProps> = (props) => {
  
   const [map,setMap] = useState<typeof MapContainer>()
   
   
  const [redirectRecords, setRedirectRecords] = useState(false)

      const [showAlert1, setShowAlert1] = useState(false);
      const [redirectHome, setRedirectHome] = useState(false);
      /*Change between pages when ok is clicked in alert
      <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}  style={{  height: "100vh" }}>
    <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
           
          />
    <Marker position={[51.505, -0.09]}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
  </MapContainer>
      <IonButton color="warning" size="large" className="buttons" shape="round" expand="block" routerLink="/start/photo">Record with photo/video</IonButton>
     
  AIzaSyAmfNAhG-WbTTCN-7JmHApcvr9e1tYirGw - API key
  */
  if (redirectHome==true){
    return <Redirect to='/frontpage' />
  } 
  if (redirectRecords ==true){
    return <Redirect to='/start/records'/>
  }
  console.log("In the map page")
  return (
    
    <>
    <IonRouterOutlet>
          <Route exact path='/start/records' component={Records} />
  </IonRouterOutlet>
     <IonButton color="warning" size="large" className="buttons" shape="round" expand="block" routerLink="/start/recordform">Record without photo/video</IonButton>
    <IonButton color="warning" size="large" className="buttons" shape="round" expand="block" onClick={() => setRedirectRecords(true)}>Records entered</IonButton>
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
