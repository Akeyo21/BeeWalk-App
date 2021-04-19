import React, {  useState } from 'react';
import {IonButton, IonCard, IonCardContent, IonCol, IonGrid, IonRow,  IonModal,   IonItem, IonItemOption, IonItemOptions, IonItemSliding,  IonRouterOutlet, IonText} from '@ionic/react';

import "../pages/Default.css";
import BeeCastCount from "./BeeCastCount"
import { Redirect } from 'react-router';
import { useDispatch } from 'react-redux'
import { selectBeeSpecies } from '../Actions/Species';
import { BrowserRouter as Route} from 'react-router-dom';
import RecordForm from '../pages/RecordForm';
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
    image: string|any
    /*selectBeeSpecies: (arg0: BeeSpecies) => void*/
}
let duplicate = null;
const BeeSpeciesFile: React.FC<ContainerProps> = (props) => {
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false);
    
    const [beespecies, setBeeSpecies] = useState<BeeSpecies>();
    
    function addBeeDataToList(){
       
        setShowModal(false)
        /*var queenvalue = document.getElementsByClassName("number")[0].textContent
        var workervalue = document.getElementsByClassName("number")[1].textContent
        var unknownvalue = document.getElementsByClassName("number")[2].textContent*/
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

    const [redirectHome, setRedirectHome] = useState(false)
    if (redirectHome==true){
        return <Redirect to='/start/walk/recordform' />
      } 
  return (   
      
    <>
        <><IonModal isOpen={showModal} cssClass='modal' showBackdrop backdrop-dismiss={false}>

                          <h1>{props.common}</h1>

                          <IonGrid className="grid">
                              {props.caste.map((casteValue:Caste, index:number )=>(
                              <BeeCastCount cast={casteValue} pos={index} key={index}/>

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
                                                {props.image==""?
                                                <IonCol size="12" className="">
                                                <h1 className="ion-padding-start ion-padding-top">{props.common}</h1>
                                                <h2 className="italics">{props.scientific}</h2>
                                                </IonCol> 
                                            : <>
                                            <IonCol size="5" className="nopadding">
                                              <img src={props.image}></img>
                                          </IonCol>

                                              <IonCol size="7">
                                                  <h1 className="ion-padding-start ion-padding-top">{props.common}</h1>
                                                  <h2 className="italics">{props.scientific}</h2>
                                              </IonCol></>
                                                }
                                                 
                                                  
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

