import React, { useState } from 'react';
import '../components/ExploreContainer.css';
import { IonAlert, IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonImg, IonPage, IonRouterOutlet, IonRow, IonText, IonToolbar } from '@ionic/react';

import './Default.css';
import {Redirect, Route} from 'react-router-dom';
import MapWalk from './MapWalk'
import { connect, useDispatch } from 'react-redux';
import { Record } from '../Reducers/RecordsReducer';
import SpeciesEntered from '../components/SpeciesEntered';
import { addWalk, resetWalk } from '../Actions/Walks';
import { UpdatedWalk } from '../Reducers/WalksReducer';
import {  resetRecords } from '../Actions/Records';
interface ContainerProps { 
    records: [],
    walk: any
}
/* CommonBees - page that shows the common bees in the are
*/


const RecordsEntered: React.FC<ContainerProps> = (props) => {
  
  const [showAlert1, setShowAlert1] = useState(false);  
  const [redirectHome, setRedirectHome] = useState(false);
  const [emptyRecords, setEmptyRecords] = useState(false);
  let recordslist: [] =[]
    if (props.records){
      recordslist = Object.values(props.records)[0]
    }
  const dispatch = useDispatch()
  const sendRecordsToStorage=()=>{
    //write 
    for(const property in props.walk){
     console.log(props.walk[property])
     let walk = props.walk[property]
     
     //endtime
     var today = new Date();
     var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
     var time = new Date().getHours() + ":" + new Date().getMinutes()
     var all = new Date(date + " "+time)
     
     dispatch(addWalk(new UpdatedWalk(walk.recorder, walk.transect,walk.date,walk.startTime, walk.temp,
       walk.sunshine, walk.windSpeed 
       ,time, recordslist)))
   }
  }
  const clearRecords=()=>{
    if(recordslist.length>0){
      console.log(recordslist.length);
     sendRecordsToStorage()
     dispatch(resetWalk())
     dispatch(resetRecords())
     //clearPhotos()
     //setShowAlert1(true)
     setRedirectHome(true)
    }else{
      setEmptyRecords(true);
    }
    }
    console.log(props.records)
    //obtaining records list
    
    //console.log(recordslist[0].species)
    recordslist.map((record: Record)=>(
      console.log(typeof record)))
      if (redirectHome==true){
        return <Redirect to='/home' />
      } 
  return (
    <><><IonRouterOutlet>
      <Route path="/start/map" component={MapWalk} />
    </IonRouterOutlet></>
      <IonPage>
        <IonHeader>
        </IonHeader>
        <IonContent fullscreen>
          <IonHeader >
          </IonHeader>
          <div className="container">
            
        <div className="wholepage ">
        <IonAlert
                isOpen={emptyRecords}
                onDidDismiss={() => setEmptyRecords(false)}
                cssClass='submitalert'
                header={'No record entered'}
                message={'No records entered. Enter a record to submit'}
                buttons={[
                  {
                    text: 'OK',
                   
                  }
                ]} /> 
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
                      clearRecords()
                    }
                  },

                  {
                    text: 'Cancel',
                    role: 'cancel'
                  }
                ]} />
        <div className="top">
        <IonButton href="/mapwalk" className="light move-left" >Back</IonButton>
        
        <IonButton onClick={()=>setShowAlert1(true)} className="light move-button-right" >Save Records</IonButton>
        </div>
        
        {recordslist.map((record: Record)=>(
         <SpeciesEntered species={record.species} photos={record.photos} flower={record.flower} section={record.section}/>
        )) }
        
        </div>
        </div>
          
          
        </IonContent>
      </IonPage></>
    
    
  );
};
const mapStateToProps = function(state: any) {
  
    console.log(state.records)
    return {
      records: state.records,
      walk:state.walk,
    }
  }
  
  export default connect(mapStateToProps)(RecordsEntered);/*
export default RecordsEntered;*/
