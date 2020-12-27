import { IonContent, IonHeader, IonPage, IonRouterOutlet, IonList, IonItem, IonIcon, IonLabel, IonNote, IonListHeader, IonButton, IonCol, IonGrid, IonRow, IonTabBar, IonTabButton } from '@ionic/react';
import React from 'react';

import './Default.css';
import Login from "../pages/Login";
import AddSite from "../pages/AddSites";
import {Route} from 'react-router-dom';
import { home, walk, leaf, navigate, ellipsisHorizontal } from 'ionicons/icons';
/*MySites - gives a page that shows a list of sites the user has
entered*/
const MySites: React.FC = () => {
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

            <div className="sites">
            <IonTabBar slot="bottom" color="warning" className="tabs">
            <IonTabButton tab="home" href="/frontpage">
                <IonIcon icon={home} />
                <IonLabel>Home</IonLabel>
              </IonTabButton>
      
              <IonTabButton tab="walks" href="/walks">
                <IonIcon icon={walk} />
                <IonLabel>My walks</IonLabel>
              </IonTabButton>
              
              <IonTabButton tab="sites" href="/mysites">
                <IonIcon icon={leaf} />
                <IonLabel>My Sites</IonLabel>
              </IonTabButton>
              
              <IonTabButton tab="terms" href="/terms">
                <IonIcon icon={navigate} />
                <IonLabel>Explore</IonLabel>
              </IonTabButton>
              
              <IonTabButton tab="more" href="/more">
                <IonIcon icon={ellipsisHorizontal} />
                <IonLabel>More</IonLabel>
              </IonTabButton>
            </IonTabBar>
                <IonList lines="full" className="list">
                    <IonListHeader lines="full" color="light" id="header" >My Sites</IonListHeader>

                    <IonItem className="item" >  
                    <IonLabel> Site Name</IonLabel>
                        <IonGrid>
                            <IonRow>
                                <IonCol size="8">
                                    <IonNote className="note">0 Records submitted<br/>0 Species submitted</IonNote>
                                </IonCol>

                                <IonCol size="4">
                                    <IonButton  color="dark">Edit  </IonButton>
                                </IonCol>
                            </IonRow>
                        </IonGrid>               
                    </IonItem>

                    <IonItem className="item" >  
                    <IonLabel> Site Name</IonLabel>
                        <IonGrid>
                            <IonRow>
                                <IonCol size="8">
                                    <IonNote className="note">0 Records submitted<br/>0 Species submitted</IonNote>
                                </IonCol>

                                <IonCol size="4">
                                    <IonButton  color="dark">Edit  </IonButton>
                                </IonCol>
                            </IonRow>
                        </IonGrid>               
                    </IonItem>

                   
                </IonList>
                <IonButton color="dark" className="top-margin" href="/mysites/add">Add Site</IonButton>
            </div>
          
        </IonContent>
      </IonPage></>
  );
};

export default MySites;
