import { IonContent, IonHeader, IonPage, IonButton, IonRouterOutlet , IonTabs, IonTabBar,IonTabButton,
  IonIcon, IonLabel, IonBadge} from '@ionic/react';
  import { calendar, personCircle, map, informationCircle, ellipsisHorizontal, home, leaf, navigate, walk } from 'ionicons/icons';
  import React from 'react';
  /*import './Home.css';*/
  import '../components/ExploreContainer.css';
  import '../components/LoginPage.css';
  /**/
  export const Tabs: React.FC = () => {
    return (
      <>
        <IonTabBar slot="bottom" color="warning" className="tabs">
        <IonTabButton href="/home">
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

          <IonTabButton tab="more" href="/more">
            <IonIcon icon={ellipsisHorizontal} />
            <IonLabel>More</IonLabel>
          </IonTabButton>

         
        </IonTabBar></>
                 );
                };
                
                export default Tabs;