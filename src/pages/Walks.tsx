import { IonContent, IonHeader, IonPage, IonRouterOutlet, IonList, IonItem, IonIcon, IonLabel, IonNote, IonListHeader, IonTabButton, IonTabBar, IonButton } from '@ionic/react';
import React from 'react';

import './Default.css';
import WalkItem from '../components/WalkItem';
import Login from "../pages/Login";
import Walkdetail from "./Detail";
import {Route} from 'react-router-dom';
import { chevronForward, ellipsisHorizontal, home, leaf, navigate, walk } from 'ionicons/icons';
import { connect, useDispatch } from 'react-redux';
import { UpdatedWalk } from '../Reducers/WalksReducer';
import { resetWalks } from '../Actions/Walks';
interface ContainerProps { 
  walks:[]
}
const Walks: React.FC<ContainerProps>= (props) => {
  let walkslist: any[] =[]
  for(const property in props.walks){
   walkslist = props.walks[property]
   
 }
 
  return (
    <><><IonRouterOutlet>
      <Route path="/login" component={Login} />
      <Route path="/walkdetail" component={Walkdetail} />
    </IonRouterOutlet></>
      <IonPage >
        <IonHeader>
        </IonHeader>
        <IonContent fullscreen className="content">
          <IonHeader collapse="condense">            
          </IonHeader>
          <div className="page">
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
              <IonListHeader lines="full" color="light" id="header" >My Walks</IonListHeader>
                
            
            {walkslist.map((walk:UpdatedWalk)=>(
              <WalkItem transect ={walk.transect} date={walk.date} startTime={walk.startTime} endTime={walk.endTime}link="/walkdetail"/>
            ))}
          </IonList>

          
            
            
          
            </div>
          
        </IonContent>
      </IonPage></>
  );
};
const mapStateToProps = function(state: any) {
  return {
    walks:state.walks
  }
}

export default connect(mapStateToProps)(Walks);/*
export default Walks;*/
