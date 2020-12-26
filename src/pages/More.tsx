import { IonContent, IonHeader, IonPage, IonRouterOutlet, IonList, IonItem, IonIcon, IonLabel, IonNote, IonListHeader, IonButton, IonCol, IonGrid, IonRow } from '@ionic/react';
import React from 'react';

import './Default.css';
import Login from "../pages/Login";
import AddSite from "../pages/AddSites";
import {Route} from 'react-router-dom';
/*MySites - gives a page that shows a list of sites the user has
entered*/
const More: React.FC = () => {
  return (
    <><><IonRouterOutlet>
      <Route path="/login" component={Login} />
      <Route path="/mysites/add" component={AddSite} />
    </IonRouterOutlet></>
      <IonPage >
        <IonHeader>
        </IonHeader>
        <IonContent fullscreen className="content">
            <IonHeader>            
            </IonHeader>

            <div className="morecontent">
                <IonList lines="full" className="list">
                    <IonItem className="item" href="https://www.bumblebeeconservation.org/wp-content/uploads/2017/11/ID-sheet-big-8.pdf">  
                        <IonLabel >Bee ID Guide</IonLabel>             
                    </IonItem>

                    <IonItem className="item" href="https://www.bumblebeeconservation.org/beewalk/">  
                        <IonLabel> More Info about BeeWak </IonLabel>            
                    </IonItem>

                    <IonItem className="item" href="/">  
                        <IonLabel> Logout</IonLabel>            
                    </IonItem>                  
                </IonList>
            </div>
          
        </IonContent>
      </IonPage></>
  );
};

export default More;
