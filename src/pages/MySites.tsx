import { IonContent, IonHeader, IonPage, IonRouterOutlet, IonList, IonItem, IonIcon, IonLabel, IonNote, IonListHeader, IonButton, IonCol, IonGrid, IonRow, IonTabBar, IonTabButton, IonItemSliding, IonItemOption, IonItemOptions, IonAlert, useIonAlert } from '@ionic/react';
import React, { useState } from 'react';

import './Default.css';
import Login from "../pages/Login";
import AddSite from "../pages/AddSites";
import {Redirect, Route} from 'react-router-dom';
import { home, walk, leaf, navigate, ellipsisHorizontal } from 'ionicons/icons';
import { connect, useStore } from 'react-redux';
import Tabs from '../components/Tabs';
/*MySites - gives a page that shows a list of sites the user has
entered*/
interface ContainerProps { 
  transects:[],
  sections:[]
}

/*Form that is rendered when the manual adding of bee data
is selected*/
const MySites: React.FC<ContainerProps> = (props) => {
  const[addSite, setAddSite] = useState(false)
  const[goToTransect, setGoToTransect] = useState(false)
  let transectslist: any[] =[]
  for(const property in props.transects){
   transectslist = props.transects[property]
   
 }
 
 let sectionslist: any[] =[]
  for(const property in props.sections){
   sectionslist = props.sections[property]   
 }
 console.log(sectionslist)
 const [showWarning, setShowWarning] = useState(false);
  //const [proceedDelete, setProceedDelete] = useState(false);
 const deleteTransect=(key:any)=>{
   
 }

 const [present] = useIonAlert(); 
 const checkTransects=()=>{
   if(sectionslist.length>0){
    present({
      cssClass: 'my-css',
      header: 'Incomplete Transect',
      message: 'Save sections in the new transect entered',
      buttons:[ {
       text: 'OK',
      handler(){
        setGoToTransect(true)
        
        //deleteTransect(showWarning[1]);
      }
     }, 'Cancel'],
      onDidDismiss: (e) => console.log(e) ,
    })
   }else{
     setAddSite(true)
   }
 }
 if(addSite){
   return <Redirect to="/mysites/add"/>
 }
 if(goToTransect){
  return <Redirect to="/transect"/>
 }
  return (
    <><><IonRouterOutlet>
      <Route path="/login" component={Login} />
      <Route path="/mysites/add" component={AddSite} />
    </IonRouterOutlet></>
      <IonPage >
        <IonHeader>
        </IonHeader>
        <IonContent force-overscroll className="content">
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
           
                <IonList lines="full" className="list">
                    <IonListHeader lines="full" className="whitebackground" id="header" >
                      <h1 className="bold">My Sites</h1>
                    {sectionslist? 
                sectionslist.length>0?
                 <IonButton className="site-button" href="/transect">Finish Adding Site</IonButton>:
                 <IonButton className="site-button" href="/mysites/add">Add Site</IonButton>: 
                 <IonButton className="site-button" href="/mysites/add">Add Site</IonButton>}    
                
                    </IonListHeader>
                    {transectslist.length==0?<h1 className="dark">No Transects have been set up</h1>:
                    transectslist.map((transect, index)=>(
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
                <Tabs/>
            </div>
          
        </IonContent>
      </IonPage></>
  );
};
const mapStateToProps = function(state: any) {
  return {
    transects:state.transects,
    sections:state.sections
  }
}
export default connect(mapStateToProps)(MySites);/*

export default MySites;*/
