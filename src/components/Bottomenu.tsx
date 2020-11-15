import React from 'react';
import './ExploreContainer.css';
import { IonContent, IonHeader, IonPage, IonButton, IonRouterOutlet , IonTabs, IonTabBar,IonTabButton,
    IonIcon, IonLabel, IonBadge, IonTab} from '@ionic/react';
import { calendar, personCircle, map, informationCircle, triangle, ellipse, square } from 'ionicons/icons';
import Login from "../pages/Login";
import Register from "../pages/Register";
import Terms from "../pages/Terms&Conditions";
import {Redirect, Route} from 'react-router-dom';
import { render } from '@testing-library/react';
import { IonReactRouter } from '@ionic/react-router';

interface ContainerProps { 
  
}
/* <IonTabs >
              <IonRouterOutlet>
                  <Route path='/:tab(login)' component={Login} exact />
              </IonRouterOutlet>
              <IonTabBar slot="bottom"  className="tabbar">
                  <IonTabButton tab="login" href="/login">
                      <IonLabel color="warning"> Log In</IonLabel>
                  </IonTabButton>
              </IonTabBar>
          </IonTabs> */
const Bottomenu: React.FC<ContainerProps> = () => {
  
  return (            
           
          <><IonReactRouter>
                <IonTabs>
              <IonRouterOutlet>
                  <Route path="/login" component={Login} exact={true} />
                  <Route path="/register" component={Register} exact={true} />
                  <Route path="/terms" component={Terms} />
                  <Route path="/" render={() => <Redirect to="/login" />} exact={true} />
              </IonRouterOutlet>
              <IonTabBar slot="bottom">
                  <IonTabButton tab="login" href="/login">
                      <IonIcon icon={triangle} />
                      <IonLabel>Tab 1</IonLabel>
                  </IonTabButton>
                  <IonTabButton tab="register" href="/register">
                      <IonIcon icon={ellipse} />
                      <IonLabel>Tab 2</IonLabel>
                  </IonTabButton>
                  <IonTabButton tab="terms" href="/terms">
                      <IonIcon icon={square} />
                      <IonLabel>Tab 3</IonLabel>
                  </IonTabButton>
              </IonTabBar>
          </IonTabs>
      </IonReactRouter></>
          
  );
};

export default Bottomenu;
