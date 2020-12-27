import { IonContent, IonHeader, IonPage, IonButton, IonRouterOutlet , IonTabs, IonTabBar,IonTabButton,
  IonIcon, IonLabel, IonBadge} from '@ionic/react';
  import { calendar, personCircle, map, informationCircle, ellipsisHorizontal, home, leaf, navigate, walk } from 'ionicons/icons';
  import React from 'react';
  /*import './Home.css';*/
  import '../components/ExploreContainer.css';
  import '../components/LoginPage.css';
  import {Redirect, Route} from 'react-router-dom';
  
  import Home from '../pages/Home';
  import Terms from "../pages/Terms&Conditions";
  import Walks from '../pages/Walks';
  import Postlogin from '../pages/Postlogin';
  import MySites from '../pages/MySites';
  import More from '../pages/More';
  /**/
  export const Tabs: React.FC = () => {
    return (
            <IonTabBar slot="bottom" color="warning">
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
                 );
                };
                
                export default Tabs;