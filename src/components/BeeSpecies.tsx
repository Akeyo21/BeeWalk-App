import React, { useContext, useState } from 'react';
import {IonButton, IonCard, IonCardContent, IonCol, IonGrid, IonRow, IonRouterLink, IonModal, IonPicker, IonFab, IonFabButton, IonIcon, IonBackdrop, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonRouterOutlet} from '@ionic/react';

import "../pages/Default.css";
import BeeCastCount from "./BeeCastCount"
import { add, addCircle, removeCircle, removeOutline } from 'ionicons/icons';
/*import { Context } from '../pages/DuringWalk';*/
import { State } from 'ionicons/dist/types/stencil-public-runtime';
import { Redirect } from 'react-router';
import { connect, useDispatch } from 'react-redux'

import { useSelector } from 'react-redux'
import { Dispatch } from 'redux';
import { selectBeeSpecies } from '../Actions/Species';
import { BrowserRouter as Router,Link, Route, Switch} from 'react-router-dom';
import type {
    MemoryHistory
  } from 'history'
import RecordForm from '../pages/RecordForm';
import { IonReactRouter } from '@ionic/react-router';
import { BeeSpecies } from '../Reducers/SpeciesReducer';
  
/* BeeSpecies - Template for the body of the DuringWalk page t
hat collects data during the walk 
              - Contains the specific bee species info 
*/

interface ContainerProps {  
    content: string
    /*selectBeeSpecies: (arg0: BeeSpecies) => void*/
}
let duplicate = null;
const BeeSpeciesFile: React.FC<ContainerProps> = (props) => {
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false);
    
    const [beespecies, setBeeSpecies] = useState<BeeSpecies>();
    
    function addBeeDataToList(){
       
        setShowModal(false)
        var queenvalue = document.getElementsByClassName("number")[0].textContent
        var workervalue = document.getElementsByClassName("number")[1].textContent
        var unknownvalue = document.getElementsByClassName("number")[2].textContent

        /*if (queenvalue && workervalue && unknownvalue ){
            let beeEntered = new BeeType(props.content, parseInt(queenvalue),
            parseInt(workervalue), parseInt(unknownvalue))
            /*beedatalist.push(beeEntered)
            var beedatalist: BeeType[] = beedata.push(beeEntered)
            /*console.log(beedatalist)
            addBeeData(beedatalist)
            
        }*/

        var caste = []
        if (Number(queenvalue)>0|| Number(workervalue)>0||Number(unknownvalue)>0){
        if(Number(queenvalue)>0){
            let queen: {[k: string]: any} = {};
            queen["Queen"] = queenvalue
            caste.push(queen)
        }
        if (Number(workervalue)>0){
           let  worker: {[k: string]: any} = {};
            worker["Worker"] = workervalue
            caste.push(worker)
        }
        if (Number(unknownvalue)>0){
            let unknown: {[k: string]: any} = {};
            unknown["UnKnown"] = unknownvalue
            caste.push(unknown)
        }
        let beeEntered = new BeeSpecies(props.content, caste)
        setBeeSpecies(beeEntered)
        //dispatch({ type: 'selectBeeSpecies', payload: beeEntered })
        dispatch(selectBeeSpecies(beeEntered))
        /*props.selectBeeSpecies(beeEntered)
        /*console.log(HoldingData.getBeeSpecies())*/
        setRedirectHome(true)
        }
        

    }
    const bee = (state: { species: BeeSpecies; }) => state.species
  const todos = useSelector(bee)
  console.log(todos)
    const [redirectHome, setRedirectHome] = useState(false)
    if (redirectHome==true){
        return <Redirect to='/start/walk/recordform' />
      } 
  return (   
      
    <><IonRouterOutlet>
          <Route exact path="/start/walk/recordform" component={RecordForm} />
  </IonRouterOutlet>
        <><IonModal isOpen={showModal} cssClass='modal' showBackdrop backdrop-dismiss={false}>

                          <h1>{props.content}</h1>

                          <IonGrid className="grid">
                              <BeeCastCount cast="Queen" />
                              <BeeCastCount cast="Worker" />
                              <BeeCastCount cast="Unknown" />
                          </IonGrid>

                          <IonGrid>
                              <IonRow>
                                  <IonCol size="6">
                                      
                                      <IonButton  onClick={() => addBeeDataToList()}  color="dark" className="left-margin">Add species</IonButton>
                                   
                                  </IonCol>

                                  <IonCol size="4">
                                      <IonButton onClick={() => setShowModal(false)} color="dark" className="left-margin">Cancel</IonButton>
                                  </IonCol>
                              </IonRow>
                          </IonGrid>


                      </IonModal>
                          <IonItemSliding>
                              <IonItem className="nopadding nomargin">
                                  <IonCard className="card " onClick={() => setShowModal(true)}>
                                      <IonCardContent className="nopadding">
                                          <IonGrid className="nopadding">
                                              <IonRow>
                                                  <IonCol size="8" className="nopadding">
                                                      <img src="assets/images/bee.jpg"></img>
                                                  </IonCol>

                                                  <IonCol size="4">
                                                      <h1 className="ion-padding-start ion-padding-top">{props.content}</h1>
                                                  </IonCol>
                                              </IonRow>
                                          </IonGrid>
                                      </IonCardContent>
                                  </IonCard>
                              </IonItem>

                              <IonItemOptions side="end">
                                  <IonItemOption color="warning" expandable>
                                      <h3>Bee Cast Info</h3>
                                  </IonItemOption>
                              </IonItemOptions>
                          </IonItemSliding></>
                          
    </>  
  );
    
};
export default BeeSpeciesFile;

export const MyContext = React.createContext(duplicate);
/*
const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        selectBeeSpecies: (species: BeeSpecies) => {
        dispatch(selectBeeSpecies(species));
      }
    }
  }

export default connect(null,mapDispatchToProps)(BeeSpeciesFile);*/

