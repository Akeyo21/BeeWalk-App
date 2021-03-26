import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonRouterOutlet, IonList, IonItem, IonItemDivider, IonIcon, IonLabel, IonNote, IonListHeader, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonImg, IonSlide, IonSlides, IonBackButton, IonText } from '@ionic/react';
import React from 'react';

import './Default.css';
import Login from "./Login";
import Register from "./Register";
import {Route, useParams} from 'react-router-dom';
import { connect } from 'react-redux';
import { Photo } from './Camera';
interface ContainerProps { 
  walks:[],
  transects:[]
}
const Detail: React.FC<ContainerProps>= (props) => {
  const slideOpts = {
    initialSlide: 1,
    speed: 400
  };
  const { id } = useParams()
  console.log(id)
  let walkslist: any[] =[]
  for(const property in props.walks){
   walkslist = props.walks[property]
   
 }
 let transectslist: any[] =[]
  for(const property in props.transects){
   transectslist = props.transects[property]
 }
  return (
    <><><IonRouterOutlet>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </IonRouterOutlet></>
      <IonPage >
        <IonHeader>
        </IonHeader>
        <IonContent fullscreen className="content">
          <IonHeader>         
          </IonHeader>
          <div className="division">
          <IonBackButton defaultHref="/walks" icon="buttonIcon" text="BACK" className="ion-float-left" color="dark"/><br/>
   
          <h2>
              {transectslist[walkslist[id].transect].name}
          </h2>
          <h4>
          {walkslist[id].date}<br></br>{walkslist[id].startTime} - {walkslist[id].endTime}
          </h4>
          {walkslist[id].records.map((record: Record)=>(
          <><IonCard className="card">
        {record.photos.length==1?  record.photos.map((photo: Photo) => (<IonImg src={photo.webviewPath} />)) :
        record.photos.length>1? 
        <IonSlides pager={true} options={slideOpts}>
            {record.photos.map((photo: Photo) => ( <IonSlide>
                <IonImg src={photo.webviewPath} />
            </IonSlide>))}
        </IonSlides> :<IonText></IonText>}
    <IonCardHeader>
      <IonCardTitle className="dark">
      {record.species.name} spotted on the walk<br/>
      on section {record.section}
        </IonCardTitle>
    </IonCardHeader>

    <IonCardContent>
      Bee Caste with number<br></br>
      {record.species.caste.map((casteobject: { [s: string]: unknown; } | ArrayLike<unknown>, index) => (
        <IonText key={index}>{Object.keys(casteobject)[0]}: {Object.values(casteobject)[0]}</IonText>
      ))} 
      </IonCardContent>
  </IonCard></>
      ))}
          </div>
          
        </IonContent>
      </IonPage></>
  );
};
const mapStateToProps = function(state: any) {
  return {
    walks:state.walks,
    transects: state.transects
  }
}

export default connect(mapStateToProps)(Detail);/*
export default Detail;*/
