import React, { useState } from 'react';
/*import '../components/ExploreContainer.css';*/
import { IonAlert, IonButton,  IonCard,  IonCardContent,  IonCol,  IonContent, IonFooter, IonGrid, IonHeader, IonInput, IonPage, IonRouterLink, IonRouterOutlet, IonRow, IonSegment, IonSegmentButton, IonText, IonToolbar } from '@ionic/react';
/*import '../components/LoginPage.css';
import './PreWalk.css';*/
import './Default.css';
import DuringWalkHeader from '../components/DuringWalkHeader'

import '../theme/variables.css';
import ManualData from "./ManualData";
import {Redirect, Route} from 'react-router-dom';
import BeeSpeciesFile from '../components/BeeSpecies'
import BeeRecords from '../components/BeeRecords'
import ReactDOM from 'react-dom';
import Postlogin from './Postlogin';
import { ReactComponent } from '*.svg';

/*
    DuringWalk - page that collects data during walk
*/
interface ContainerProps { 
}

/*export default class SayHello extends React.Component<SayHelloProps,SayHelloState> {
  constructor(props: SayHelloProps) {
    super(props);
    this.state = {
      count: 0
    };
  }*/
const DuringWalk: React.FC<ContainerProps> = () => {
//export default class DuringWalk extends React.Component{
  
  const [beedata, addBeeData] = useState([]as any)
  const RepeatSpecies: React.FC<ContainerProps> = () => {
    return(
      <>
      <Context.Provider value={{beedata:beedata as any , addBeeData: (list) => {return list} }}>
      <BeeSpeciesFile content="Bee Species Name 1" />
      <BeeSpeciesFile content="Bee Species Name 2" />
      <BeeSpeciesFile content="Bee Species Name 3" />
      <BeeSpeciesFile content="Bee Species Name 4" />
      <BeeSpeciesFile content="Bee Species Name 5" />
      <BeeSpeciesFile content="Bee Species Name 6" />
        </Context.Provider></>
    )
  };
  class BeeSpecies{
    name: String;
    queen: number;
    worker: number;
    unknown: number;
    constructor(name: String, queen: number, worker: number, unknown:number){
        this.name = name;
        this.queen = queen;
        this.worker = worker;
        this.unknown = unknown;
    }
}

const listremove=(array: string[]|any[], target:BeeSpecies)=>{
    var filtered = array.filter(function(value, index, arr){ 
    return value.name !=target.name;
  });
  return filtered
}
    const removeDuplicates=(list: BeeSpecies[]):BeeSpecies[]=>{
      if (list.length==1 || list.length==0){
        return list
      }else{
      var queen = 0
      var worker = 0
      var unknown = 0
      for(var index=0;index<list.length;index++){
        for (var second=index+1;second<list.length;second++){
          console.log(index + "index position")
          console.log(second+"second")
          if (list[index].name == list[second].name){
            console.log("adding")
            queen += list[second].queen
            worker += list[second].worker
            unknown +=list[second].unknown                  
          } 
          
        }
        queen += list[index].queen
          worker += list[index].worker
          unknown +=list[index].unknown
          var beecombined = new BeeSpecies(list[index].name, queen, worker, unknown )
          list = listremove(list, list[index])
          return [beecombined].concat(removeDuplicates(list.slice(index)))          
      }
      return []
    }
    };
  const RepeatRecords: React.FC<ContainerProps> = () => {
    if (beedata.length >0){
    return(
      
      <><Context.Provider value={{ beedata: beedata, addBeeData: (list) => {return list } }}>
        
        
      {console.log(beedata)}
      {console.log(removeDuplicates(beedata))}
        {removeDuplicates(beedata).map((item: any) => (
      
      <BeeRecords key={item.name}name={item.name} queen={item.queen} worker={item.worker} unknown={item.unknown}/>
        ))}
        {console.log(beedata.length)}
        </Context.Provider></>
    )
        }else{
          console.log("No data entered")
          return (
            <h1>No Bee Records Entered</h1>
          )
        }
  };
  /*
  const showRecords=(truth: boolean)=>{
    console.log("Entered loop")
    console.log(truth + "truth value")
      var body = document.getElementById("main")
      if (truth){
        ReactDOM.render(
          <RepeatSpecies/> , body)
      }else{
        ReactDOM.render(
          <><RepeatRecords />            
          
            </> , document.getElementById("main"))
      }     
  }*/
  
  const [showAlert1, setShowAlert1] = useState(false);
  const [redirectHome, setRedirectHome] = useState(false);
  const[showRecords, setShowRecords] = useState(false)
  /*Change between pages when ok is clicked in alert*/
  if (redirectHome==true){
    return <Redirect to='/frontpage' />
  }
  console.log(beedata.length)
  console.log("Hello")
  return (
    
    <><></><><IonRouterOutlet>
      <Route path="/start/duringwalk/manual" component={ManualData} />
    </IonRouterOutlet></>
      <IonPage>
          <IonContent fullscreen className="whitebackground ">
          
            <IonHeader className="switch">
              <IonButton color="light" href="/start/duringwalk/manual" >
                Add Manually
              </IonButton>

              <IonButton onClick={() => setShowAlert1(true)} className="whitebackground ion-float-right">
                Submit
              </IonButton>
              <IonAlert
                isOpen={showAlert1}
                onDidDismiss={() => setShowAlert1(false)}
                cssClass='submitalert'
                header={'Submission'}
                message={'Do you wish to submit your data?'}
                buttons={[
                  {
                    text: 'OK',
                    handler:()=>{
                      setRedirectHome(true)
                    }
                  },

                  {
                    text: 'Cancel',
                    role: 'cancel'
                  }
                ]} />

              <IonToolbar className="toolbar">
                <IonSegment onIonChange={(e) => {(e.detail.value == "enter")? setShowRecords(false) : setShowRecords(true) }}>
                  <IonSegmentButton value="enter" >Enter Records</IonSegmentButton>
                  <IonSegmentButton value="records" >Check Records</IonSegmentButton>
                </IonSegment>
              </IonToolbar>

            </IonHeader>
            <div className="datacontent" id="main"> 
              {showRecords ? (<RepeatRecords/>):(<RepeatSpecies />) }
            </div>


          </IonContent> </IonPage></>
    
    
  );
};
export const Context = React.createContext({ beedata:[] as any, addBeeData: (list: any) => {return list} });
export default DuringWalk;
