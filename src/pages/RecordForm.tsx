import { IonContent, IonHeader, IonPage, IonRouterOutlet, IonList, IonItem, IonIcon, IonLabel, IonNote, IonListHeader, IonTabButton, IonTabBar, IonInput, IonButton, IonLoading } from '@ionic/react';
import React, { useContext, useState } from 'react';

import './Default.css';
import RecordingForm from '../components/Form';
import Login from "../pages/Login";
import Walkdetail from "./Detail";
import {Route} from 'react-router-dom';
import HoldingData from "./DataTransfer"
import{val, MyContext}from'../components/BeeSpecies';
import { useSelector, connect } from 'react-redux';
import { BeeSpecies } from '../Reducers/SpeciesReducer';
//import { BeeSpecies } from '../reducers/SpeciesReducer';
interface ContainerProps { 
  species: BeeSpecies|any
}
const RecordForm: React.FC<ContainerProps> = (props) => {
  console.log(HoldingData)
  console.log(val)
  //const {beespecies} = useContext(Context)
  console.log(MyContext)
  console.log()
  const bee = (state: { species: BeeSpecies; }) => state.species
  const todos = useSelector(bee)
  console.log(todos)
  const values = ()=>{
    /*for (const property in todos.caste){
      return <h2>{property} </h2>
    }*/
  }//
  //console.log(JSON.stringify(props.species))
  let value = ""
  const [loading, setLoading]= useState(false)
  /*if (props.species){
    if (!props.species) setLoading(true)
    setLoading(false)
  }<ul>
      {elements.map((value, index) => {
        return <li className="dark"key={index}>{value}</li>
      })}
    </ul>*/
  let speciesEntered:any
  //const head=()=>{
  //extracts the beespecies value from the props(extracted from the store)
  for (const property in (props.species)){   
    speciesEntered = props.species[property]
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
          <IonLoading isOpen={loading} message="Getting weather info" onDidDismiss={()=>{setLoading(false)}}/>
            
          
          <Context.Provider value={{speciesEntered:BeeSpecies }}>         
          <RecordingForm species = {speciesEntered}/>
          </Context.Provider>
          
        </IonContent>
      </IonPage></>
  );
};

const mapStateToProps = function(state: any) {
  
  console.log(state.species)
  return {
    species: state.species
  }
}

export default connect(mapStateToProps)(RecordForm);
export const Context = React.createContext({ speciesEntered:BeeSpecies});
/*
export default RecordForm;*/
