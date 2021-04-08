import { IonContent, IonHeader, IonPage, IonButton, IonRouterOutlet , IonTabs, IonTabBar,IonTabButton,
IonIcon, IonLabel, IonBadge, IonSlides, IonSlide, IonText, IonFooter} from '@ionic/react';
import { calendar, personCircle, map, informationCircle, ellipsisHorizontal, home, leaf, navigate, walk } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
/*import './Home.css';*/
import '../components/ExploreContainer.css';
import '../components/LoginPage.css';
import { useDispatch } from 'react-redux';
import { resetWalks } from '../Actions/Walks';
import Tabs from '../components/Tabs';
import data from '../beeInfo/species_set.json';
import bee_data from  '../beeInfo/bee_data.json';
import CommonBees from '../components/CommonBees';
/**/
const Postlogin: React.FC = () => {
 
  

 console.log("Home");
  return (
    
    <><>
     </>
        <IonContent fullscreen>
          
          
          <div className="container">
            
              <div className="wholepage" >      
            
                <CommonBees/>
                <div id="move">
                
                    <IonButton href="/start/prewalk"
                    color="warning" size="large" className="buttons" shape="round" expand="block">
                        Start Walk
                    </IonButton>

                    <IonButton routerLink="/commonbees"
                    color="warning" size="large" className="buttons" shape="round" expand="block">
                        Bees in my area
                    </IonButton>

                    
         
                </div>
                
                <Tabs/>
              </div>
          </div>
         
        </IonContent></>
  );
};

export default Postlogin;
