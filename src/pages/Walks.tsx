import { IonContent, IonHeader, IonPage, IonRouterOutlet, IonList, IonItem, IonIcon, IonLabel, IonNote, IonListHeader, IonTabButton, IonTabBar, IonButton, IonItemOption, IonItemOptions, IonItemSliding } from '@ionic/react';
import React from 'react';

import './Default.css';
import WalkItem from '../components/WalkItem';
import Login from "../pages/Login";
import Walkdetail from "./Detail";
import {Route} from 'react-router-dom';
import { chevronForward, ellipsisHorizontal, home, leaf, navigate, walk } from 'ionicons/icons';
import { connect, useDispatch } from 'react-redux';
import { UpdatedWalk } from '../Reducers/WalksReducer';
import { deleteWalk, resetWalks } from '../Actions/Walks';
interface ContainerProps { 
  walks:[],
  transects:[]
}
const Walks: React.FC<ContainerProps>= (props) => {
  
  let walkslist: any[] =[]
  for(const property in props.walks){
   walkslist = props.walks[property]
   
 }
 
 let transectslist: any[] =[]
  for(const property in props.transects){
   transectslist = props.transects[property]
 }
 console.log(transectslist[0].name)
 for(let i=0; i<walkslist.length;i++){
   try{
  console.log(transectslist[walkslist[i].transect].name)
   }catch(e){
     console.log(i)
   }
}
const dispatch = useDispatch()
  return (
    <><><IonRouterOutlet>
      <Route path="/login" component={Login} />
      <Route path="/walkdetail" component={Walkdetail} />
    </IonRouterOutlet></>
      <IonPage >
        <IonContent fullscreen className="content">
          
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
                
            
            {walkslist.map((walk:UpdatedWalk, index)=>(              
              
              <IonItemSliding key={index} ><WalkItem transect={transectslist[walk.transect].name} date={walk.date} startTime={walk.startTime} endTime={walk.endTime} link={`/walkdetail/${index}`} />
                <IonItemOptions side="end">
                  <IonItemOption onClick={() => dispatch(deleteWalk(index))}>Delete</IonItemOption>
                </IonItemOptions>
                </IonItemSliding>
            ))}
          </IonList>

          
            
            
          
            </div>
          
        </IonContent>
      </IonPage></>
  );
};
const mapStateToProps = function(state: any) {
  return {
    walks:state.walks,
    transects: state.transects
  }
}

export default connect(mapStateToProps)(Walks);/*
export default Walks;*/
