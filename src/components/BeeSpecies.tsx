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
import {Caste} from '../beeInfo/DifferentBeeSpecies'

/* BeeSpecies - Template for the body of the DuringWalk page t
hat collects data during the walk 
              - Contains the specific bee species info 
*/

interface ContainerProps {  
    //content: string
    common: string|any
    scientific:string|any
    caste: Caste[]|any
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
        let x =0
        
        var castelist = []
        for(let caste in document.getElementsByClassName("casteName")){
            if ( Number (document.getElementsByClassName("number")[caste].textContent) >0){
                let casteGiven:any = {}
                let l = String(document.getElementsByClassName("casteName")[caste].textContent)
                casteGiven[l] = Number (document.getElementsByClassName("number")[caste].textContent)
                castelist.push(casteGiven)
            }
        }
        console.log(castelist)


        if(castelist.length>0){
        let beeEntered = new BeeSpecies(props.common, castelist)
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

                          <h1>{props.common}</h1>

                          <IonGrid className="grid">
                              {props.caste.map((casteValue:Caste, key:number )=>(
                              <BeeCastCount cast={casteValue} pos={key}/>

                              ))}
                          </IonGrid>

                          <IonGrid>
                              <IonRow>
                                  <IonCol size="6">
                                      
                                      <IonButton  onClick={() => addBeeDataToList()}  color="dark" className="left-margin">Add species</IonButton>
                                   
                                  </IonCol>

                                  <IonCol size="6">
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
                                                  <IonCol size="5" className="nopadding">
                                                      <img src="assets/images/bee.jpg"></img>
                                                  </IonCol>

                                                  <IonCol size="7">
                                                      <h1 className="ion-padding-start ion-padding-top">{props.common}</h1>
                                                      <h2 className="italics">{props.scientific}</h2>
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

