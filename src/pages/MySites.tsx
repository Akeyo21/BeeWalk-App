import { IonContent, IonHeader, IonPage, IonRouterOutlet, IonList, IonItem, IonIcon, IonLabel, IonNote, IonListHeader, IonButton, IonCol, IonGrid, IonRow, IonTabBar, IonTabButton, IonItemSliding, IonItemOption, IonItemOptions, IonAlert } from '@ionic/react';
import React, { useState } from 'react';

import './Default.css';
import Login from "../pages/Login";
import AddSite from "../pages/AddSites";
import {Route} from 'react-router-dom';
import { home, walk, leaf, navigate, ellipsisHorizontal } from 'ionicons/icons';
import { connect, useStore } from 'react-redux';
/*MySites - gives a page that shows a list of sites the user has
entered*/
interface ContainerProps { 
  transects:[]
}

/*Form that is rendered when the manual adding of bee data
is selected*/
const MySites: React.FC<ContainerProps> = (props) => {
  let transectslist: any[] =[]
  for(const property in props.transects){
   transectslist = props.transects[property]
   
 }
 const [showWarning, setShowWarning] = useState(false);
  //const [proceedDelete, setProceedDelete] = useState(false);
 const deleteTransect=(key)=>{
   
 }
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
            <IonAlert
                isOpen={showWarning}
                onDidDismiss={() => setShowWarning(false)}
                cssClass='submitalert'
                header={'Are you sure you?'}
                message={'It also deletes walks made on the transect'}
                buttons={[
                  {
                    text: 'OK',
                   handler(){
                     //deleteTransect(showWarning[1]);
                   }
                  }
                ]} />
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
                    {transectslist.map((transect, index)=>(
                      <IonItemSliding key={index}>
                      <IonItem className="item" >  
                      <IonLabel> {transect.name}</IonLabel>
                          <IonGrid>
                              <IonRow>
                                  <IonCol size="8">
                                      <IonNote className="note">0 Records submitted<br/>0 Species submitted</IonNote>
                                  </IonCol>
  
                                  
                              </IonRow>
                          </IonGrid>  
                                   
                      </IonItem>
                      <IonItemOptions side="end">
                  <IonItemOption onClick={(index)=>(deleteTransect(index))}>Delete</IonItemOption>
                </IonItemOptions> 
                      </IonItemSliding>
                    ))}
                   
                </IonList>
                <IonButton color="dark" className="top-margin" href="/mysites/add">Add Site</IonButton>
            </div>
          
        </IonContent>
      </IonPage></>
  );
};
const mapStateToProps = function(state: any) {
  return {
    transects:state.transects
  }
}
export default connect(mapStateToProps)(MySites);/*

export default MySites;*/
