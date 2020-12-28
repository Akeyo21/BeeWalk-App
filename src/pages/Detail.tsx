import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonRouterOutlet, IonList, IonItem, IonItemDivider, IonIcon, IonLabel, IonNote, IonListHeader, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonImg, IonSlide, IonSlides, IonBackButton } from '@ionic/react';
import React from 'react';

import './Default.css';
import Login from "./Login";
import Register from "./Register";
import {Route} from 'react-router-dom';
const Detail: React.FC = () => {
  const slideOpts = {
    initialSlide: 1,
    speed: 400
  };
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
          <IonBackButton defaultHref="/frontpage" icon="buttonIcon" text="BACK" className="ion-float-left" color="dark"/><br/>
   
          <h2>
              Transect
          </h2>
          <h4>
              Date<br></br>Time
          </h4>
          <IonCard className="card">
            <IonCardHeader>
              <IonCardTitle className="dark">
              Bee Species spotted on the walk
                </IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
              Bee Caste with number<br></br>
              Queen:5
            </IonCardContent>
          </IonCard>

          <IonCard className="card">
            <img src="assets/images/bee.jpg"></img>
            <IonCardHeader>
              <IonCardTitle className="dark">
              Single image taken<br></br>
              Bee Species spotted on the walk
              
                </IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
              Bee Caste with number<br></br>
              Queen:5
            </IonCardContent>
          </IonCard>

          <IonCard className="card">
          <IonSlides pager={true} options={slideOpts}>
            <IonSlide>
            <img src="assets/images/bee.jpg"></img>
            </IonSlide>
            <IonSlide>
            <img src="assets/images/bee.jpg"></img>
            </IonSlide>
            <IonSlide>
            <img src="assets/images/bee.jpg"></img>
            </IonSlide>
          </IonSlides>
            <IonCardHeader>
              <IonCardTitle className="dark">
              Many images taken<br/>
              Bee Species spotted on the walk
              
                </IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
              Bee Caste with number<br></br>
              Queen:5
            </IonCardContent>
          </IonCard>
          </div>
          
        </IonContent>
      </IonPage></>
  );
};

export default Detail;
