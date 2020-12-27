import { IonContent, IonHeader, IonPage, IonButton, IonRouterOutlet , IonTabs, IonTabBar,IonTabButton,
IonIcon, IonLabel, IonBadge} from '@ionic/react';
import { calendar, personCircle, map, informationCircle, ellipsisHorizontal, home, leaf, navigate, walk } from 'ionicons/icons';
import React from 'react';
/*import './Home.css';*/
import '../components/ExploreContainer.css';
import '../components/LoginPage.css';
import Tabs from '../components/Tabs';
import {Redirect, Route} from 'react-router-dom';

import Home from './Home';
import Terms from "./Terms&Conditions";
import Walks from './Walks';
import MySites from './MySites';
import More from './More';
/**/
const Postlogin: React.FC = () => {
  return (
    
    <><>
     </>
      <IonPage>
        <IonHeader>
        </IonHeader>
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            
          </IonHeader>
          
          <div className="container">
            
              <div className="wholepage" >
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
                <div id="move">
                    <IonButton routerLink="/start/prewalk"
                    color="warning" size="large" className="buttons" shape="round" expand="block">
                        Start Walk
                    </IonButton>

                    <IonButton routerLink="/commonbees"
                    color="warning" size="large" className="buttons" shape="round" expand="block">
                        Bees in my area
                    </IonButton>
                </div>
                
                
              </div>
          </div>
         
        </IonContent>
      </IonPage></>
  );
};

export default Postlogin;
