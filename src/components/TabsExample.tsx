import React from 'react';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonBadge, IonRouterOutlet, IonTab } from '@ionic/react';
import { calendar, personCircle, map, informationCircle } from 'ionicons/icons';
import { Route } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';


export const TabsExample: React.FC = () => (
  <IonTabs>
    <IonRouterOutlet>
                  <Route path='/:tab(login)' component={Login} exact />
                  <Route path='/:tab(register)' component={Register} exact />
              </IonRouterOutlet>

    <IonTabBar slot="bottom">
      <IonTabButton tab="schedule">
        <IonIcon icon={calendar} />
        <IonLabel>Schedule</IonLabel>
        <IonBadge>6</IonBadge>
      </IonTabButton>

      <IonTabButton tab="speakers">
        <IonIcon icon={personCircle} />
        <IonLabel>Speakers</IonLabel>
      </IonTabButton>

      <IonTabButton tab="map">
        <IonIcon icon={map} />
        <IonLabel>Map</IonLabel>
      </IonTabButton>

      <IonTabButton tab="about">
        <IonIcon icon={informationCircle} />
        <IonLabel>About</IonLabel>
      </IonTabButton>
    </IonTabBar>
  </IonTabs>
);

export default TabsExample;