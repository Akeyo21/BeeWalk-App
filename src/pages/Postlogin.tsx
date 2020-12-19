import { IonContent, IonHeader, IonPage, IonButton, IonRouterOutlet , IonTabs, IonTabBar,IonTabButton,
IonIcon, IonLabel, IonBadge} from '@ionic/react';
import { calendar, personCircle, map, informationCircle } from 'ionicons/icons';
import React from 'react';
/*import './Home.css';*/
import '../components/ExploreContainer.css';
import '../components/LoginPage.css';
import Login from "../pages/Login";
import Register from "../pages/Register";
import TabsExample from "../components/TabsExample";
import {Route} from 'react-router-dom';
import CommonBees from '../pages/CommonBees';
import PreWalk from '../pages/PreWalk';
/**/
const Postlogin: React.FC = () => {
  return (
    <><><IonRouterOutlet>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/commonbees" component={CommonBees} />
      <Route path="/start/prewalk" component={PreWalk} />
    </IonRouterOutlet></>
      <IonPage>
        <IonHeader>
        </IonHeader>
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            
          </IonHeader>

          <div className="container">
              <div className="wholepage" >
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
