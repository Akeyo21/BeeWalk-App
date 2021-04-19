import { IonContent,  IonPage, IonRouterOutlet, IonList,  IonListHeader,  IonButton, IonItemOption, IonItemOptions, IonItemSliding, useIonAlert, IonAlert} from '@ionic/react';
import React, { useState } from 'react';

import './Default.css';
import WalkItem from '../components/WalkItem';
import Login from "../pages/Login";
import Walkdetail from "./Detail";
import {Route} from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { UpdatedWalk } from '../Reducers/WalksReducer';
import { deleteWalk, resetWalks } from '../Actions/Walks';
import Tabs from '../components/Tabs';
interface ContainerProps { 
  walks:[],
  transects:[]
}
const Walks: React.FC<ContainerProps>= (props) => {
  
  let walkslist: any[] =[]
  for(const property in props.walks){
   walkslist = props.walks[property]
   
 }
 
 console.log("WALKS",walkslist)
 let transectslist: any[] =[]
  for(const property in props.transects){
   transectslist = props.transects[property]
 }
 /*console.log(transectslist[0].name)
 for(let i=0; i<walkslist.length;i++){
   try{
  console.log(transectslist[walkslist[i].transect].name)
   }catch(e){
     console.log(i)
   }
}*/
const [Alert, setAlert] = useState(false)
const dispatch = useDispatch()
const [present] = useIonAlert();
const confirmDelete =(index:number|any, walk:UpdatedWalk)=>{
  let site = transectslist[walk.transect].name
  let time = walk.startTime + ' to ' +walk.endTime
  let date = walk.date
  let mess = 'Are you sure you want to delete the walk made on ' + site + ' on '+date +' from '+time
  console.log(walk) 
  console.log(index)
  present({
    cssClass: 'my-css',
    header: 'Delete Walk',
    message: mess,
    buttons: [
      { text: 'Ok', handler: () =>{
        //dispatch(deleteWalk(index))
        dispatch(deleteWalk(index))
        setAlert(true)
      }},
      'Cancel',      
    ],
    onDidDismiss: (e) => console.log(e) ,
  })
}

  return (
    <><><IonRouterOutlet>
      <Route path="/login" component={Login} />
      <Route path="/walkdetail" component={Walkdetail} />
    </IonRouterOutlet></>
      <IonPage >
        <IonContent fullscreen className="content">
          
          <div className="page">
          <IonAlert
          isOpen={Alert}
          onDidDismiss={() => setAlert(false)}
          cssClass='my-custom-class'
          header={'Delete Walk'}
          message={'The walk has been deleted'}
          buttons={['OK']}
        />

          <IonList lines="full" className="list">
              <IonListHeader lines="full" className="whitebackground text-center" id="header" >
                <h1 className="bold">My Walks</h1></IonListHeader>
                
           
            {walkslist.length==0? <h1 className="dark text-center">No BeeWalk entered</h1>:
            walkslist.map((walk:UpdatedWalk, index)=>(              
              
              <IonItemSliding key={index} ><WalkItem transect={transectslist[walk.transect].name} date={walk.date} startTime={walk.startTime} endTime={walk.endTime} link={`/walkdetail/${index}`} />
                <IonItemOptions side="end">
                  <IonItemOption onClick={() => confirmDelete(index, walk)}>Delete</IonItemOption>
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
    walks:state.walks,
    transects: state.transects
  }
}

export default connect(mapStateToProps)(Walks);/*
export default Walks;*/
