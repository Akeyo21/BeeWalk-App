import React, { useContext, useState } from 'react';
import './ExploreContainer.css';
import './LoginPage.css';
import '../pages/Default.css';
import {  IonList, IonItem,  IonInput, IonButton, IonText, IonLabel, IonRouterOutlet, IonAlert } from '@ionic/react';
import { BeeSpecies } from '../Reducers/SpeciesReducer';
import { Redirect, Route } from 'react-router';
import MapWalk from '../pages/MapWalk'
import SpeciesList from '../pages/DuringWalk';
import { Photo } from '../pages/Camera';
import { Record } from '../Reducers/RecordsReducer';
import { connect, useDispatch } from 'react-redux';
import { addRecord } from '../Actions/Records';
import { selectBeeSpecies } from '../Actions/Species';
import { resetPhotos } from '../Actions/Photos';
import { Link } from 'react-router-dom';
interface ContainerProps { 
  species: BeeSpecies|any
  photos: Photo[]|any
}

const Form: React.FC<ContainerProps> = (props) => {
  const [redirectMap, setRedirectMap] = useState(false);
  const [choosingSpecies, setChoosingSpecies] = useState(false);
  const [showSpeciesAlert, setShowSpeciesAlert] = useState(false);
  const [showAlert1, setShowAlert1] = useState(false);
  //console.log(props.photo)
  let section:number
  let flower:string
  const getSectionValue=(value:any)=>{
    section= value
  }
  const getFlower=(flowervalue:string)=>{
    flower = flowervalue
  }
  const dispatch = useDispatch()
  const sendRecord=()=>{
  //check if there are photos or not
  if (section){ 
    let photolist:Photo[] =[]
    if (props.photos){
      photolist = props.photos
    }
    if(props.species){
      let beespecies = new BeeSpecies(props.species.name, props.species.caste)
      let record = new Record(section, beespecies, flower, photolist)
      dispatch(addRecord(record))
      //reset both species and photos
      dispatch(selectBeeSpecies(null))
      //dispatch(resetPhotos())
      //return <Link to= "/map"/>
      setRedirectMap(true)
    }else{
      setShowSpeciesAlert(true)
    }}else{
    //prompt for user to enter value
      setShowAlert1(true)
  }
}

  if(redirectMap==true){
    return <Redirect to="/map"/>
  }
  if(choosingSpecies==true){
    return <Redirect to="/start/duringwalk"/>
  }
  return (   
    <><><IonRouterOutlet>
      <Route exact path="/map" component={MapWalk} />
      <Route path="/start/duringwalk" component={SpeciesList}/>
      
    </IonRouterOutlet></>
      <div className="page">
        <h1 className="division margin-bottom">Edit Record</h1>
        <IonAlert
          isOpen={showAlert1}
          onDidDismiss={() => setShowAlert1(false)}
          cssClass='my-custom-class'
          header={'Section not entered'}
          message={'Fill in the section field'}
          buttons={['OK']}
        />
        <IonAlert
          isOpen={showSpeciesAlert}
          onDidDismiss={() => setShowSpeciesAlert(false)}
          cssClass='my-custom-class'
          header={'Species not selected'}
          message={'Choose a species'}
          buttons={['OK']}
        />
        <form>
          <IonList>
            <IonItem>
              <IonInput className="placeholder" placeholder="Section(filled automatically)" onIonInput={(e: any) => getSectionValue(e.target.value)}required>

              </IonInput>
            </IonItem>

            <IonItem href="/start/duringwalk" className="text-center">
              {props.species ? <IonLabel>{props.species.name}</IonLabel> : <IonLabel>Species</IonLabel>}
            </IonItem>

            {props.species ?
              props.species.caste.map((casteobject: { [s: string]: unknown; } | ArrayLike<unknown>) => (
                <><IonItem className="text-center">
                  <IonLabel>
                    {Object.keys(casteobject)[0]}: {Object.values(casteobject)[0]}
                  </IonLabel>
                </IonItem> </>
              ))

              :

              <><IonItem>
                <IonInput className="placeholder" placeholder="Caste"></IonInput>
              </IonItem>

                <IonItem>
                  <IonInput className="placeholder" placeholder="Number(filled automatically)"></IonInput>
                </IonItem></>}

            <IonItem>
              <IonInput className="placeholder" placeholder="Flower (optional)" onIonInput={(e: any) => getFlower(e.target.value)}></IonInput>
            </IonItem>

          </IonList>

          <IonButton color="warning" size="large" shape="round" expand="block" className="margin-top">Take Photo/Video</IonButton>
          <IonButton color="warning" size="large" shape="round" expand="block" className="margin-top">Automatic ID</IonButton>
          <IonButton color="warning" size="large" shape="round" expand="block" className="margin-top" onClick={() => sendRecord()} >Add Record</IonButton>


        </form>
        


      </div></>
    
  );
};

export default Form;
