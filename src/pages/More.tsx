import { IonContent, IonHeader, IonPage, IonRouterOutlet, IonList, IonItem, IonIcon, IonLabel, IonNote, IonListHeader, IonButton, IonCol, IonGrid, IonRow, IonTabBar, IonTabButton } from '@ionic/react';
import React from 'react';

import './Default.css';
import Login from "../pages/Login";
import AddSite from "../pages/AddSites";
import {Route} from 'react-router-dom';
import { home, walk, leaf, navigate, ellipsisHorizontal } from 'ionicons/icons';
import Tabs from '../components/Tabs';
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
                    <IonItem className="item" onClick={() => window.open('https://www.bumblebeeconservation.org/wp-content/uploads/2017/11/ID-sheet-big-8.pdf', '_system')} >  
                        <IonLabel >Bee ID Guide</IonLabel>             
                    </IonItem>

                    <IonItem className="item"onClick={() => window.open('https://www.bumblebeeconservation.org/beewalk/', '_system')}>
                        <IonLabel> More Info about BeeWak </IonLabel>       
                    </IonItem>

                                      
                </IonList>
                <Tabs/>
            </div>
          
        </IonContent>
      </IonPage></>
  );
};

export default More;
