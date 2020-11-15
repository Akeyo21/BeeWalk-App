import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonRouterOutlet, IonButton } from '@ionic/react';
import React from 'react';

import '../components/ExploreContainer.css';
import '../components/LoginPage.css';
import {Route} from 'react-router-dom';
import Home from './Home';
const Acknowledgement: React.FC = () => {
  return (
    <><><IonRouterOutlet>
      
      <Route path="/home" component={Home} />
    </IonRouterOutlet></>
      <IonPage>
        <IonHeader>
        </IonHeader>
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            
          </IonHeader>
          <div className="container">
              <div className="wholepage">
                  <div id="move" className="visibility">
                  <h3>Registration has been done.<br></br>
                  Wait for approval and once approved you will be notified via email addresses entered</h3>
                  <IonButton size="large" routerLink="/home"
                     color="warning" className="buttons" shape="round" expand="block">
                      Okay
                  </IonButton>
                  </div>
                  
              </div>
          </div>
        </IonContent>
      </IonPage></>
  );
};

export default Acknowledgement;
