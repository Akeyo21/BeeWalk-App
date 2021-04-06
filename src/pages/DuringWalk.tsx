import React, { useState } from 'react';
import { IonButton, IonCol, IonContent,  IonGrid,  IonHeader,  IonPage,  IonRouterOutlet, IonRow } from '@ionic/react';
import './Default.css';
import '../theme/variables.css';
import { Route} from 'react-router-dom';
import BeeSpeciesFile from '../components/BeeSpecies'
import BeeRecords from '../components/BeeRecords'
import Photo from './Photo';
import RecordForm from './RecordForm';
import {whiteTailed, redTailed, gingerYellow, Bee, allCastes} from '../beeInfo/DifferentBeeSpecies'
/*
    DuringWalk - page that collects data during walk
*/
interface ContainerProps { 
}

const DuringWalk: React.FC<ContainerProps> = () => {

  return (
    
    <><></><><IonRouterOutlet>
            <Route  exact path="/start/walk/recordform" component={RecordForm} />
    </IonRouterOutlet></>
      <IonPage>
          <IonContent fullscreen className="whitebackground ">
          
            <IonHeader >
            <IonGrid>
                  <IonRow>
                  <IonCol size="4" className="margin">
                    <IonButton href="/start/duringwalk#white" className="light" size="large"> White <br/>tailed</IonButton>

                  </IonCol>
                  <IonCol size="4">
                    <IonButton href="/start/duringwalk#red" className="light" size="large">Red<br/> tailed </IonButton>

                  </IonCol>
                  <IonCol size="4">
                    <IonButton href="/start/duringwalk#ginger" className="light" size="large">Ginger</IonButton>

                  </IonCol>

                  </IonRow>
                </IonGrid>
              </IonHeader>
              <div className="datacontent" id="main">
              <BeeSpeciesFile common={"White/Buff-tailed"} scientific={"Bombus lucorum/terrestris"} caste={allCastes} image={""}/>
              <BeeSpeciesFile common={"Bumble Bee"} scientific={"Bumble Bee"} caste={allCastes} image={""}/>
               
              <h1 id="white">White-tailed bumblebees</h1>
              <h2>Social bumblebees</h2>
               {whiteTailed.whiteSocial.map((bee:Bee, index)=>(
                  <BeeSpeciesFile key={index} common={bee.getCommon()} scientific={bee.getScientific()} caste={bee.getCaste()} image={bee.getImage()}/>
                ))}
                <h2>Cuckoo bumblebees</h2> 
                {whiteTailed.whiteCuckoo.map((bee:Bee, index)=>(
                  <BeeSpeciesFile key={index} common={bee.getCommon()} scientific={bee.getScientific()} caste={bee.getCaste()} image={bee.getImage()}/>
                ))}

                <h1 id="red">Red-tailed bumblebees</h1>
                <h2>Social bumblebees</h2>
                {redTailed.redSocial.map((bee:Bee, index)=>(
                  <BeeSpeciesFile key={index} common={bee.getCommon()} scientific={bee.getScientific()} caste={bee.getCaste()} image={bee.getImage()}/>
                ))}
                <h2>Cuckoo bumblebees</h2> 
                {redTailed.redCuckoo.map((bee:Bee, index)=>(
                  <BeeSpeciesFile key={index} common={bee.getCommon()} scientific={bee.getScientific()} caste={bee.getCaste()} image={bee.getImage()}/>
                ))}


                <h1 id="ginger">Ginger-yellow bumblebees</h1>
                <h2>Social bumblebees</h2>
                {gingerYellow.gingerSocial.map((bee:Bee,index)=>(
                  <BeeSpeciesFile key={index} common={bee.getCommon()} scientific={bee.getScientific()} caste={bee.getCaste()} image={bee.getImage()}/>
                ))}
                <h2>Cuckoo bumblebees</h2> 
                {gingerYellow.gingerCuckoo.map((bee:Bee, index)=>(
                  <BeeSpeciesFile key={index} common={bee.getCommon()} scientific={bee.getScientific()} caste={bee.getCaste()} image={bee.getImage()}/>
                ))}
            </div>

              


          </IonContent> </IonPage></>
    
    
  );
};
/*export const Context = React.createContext({ beedata:[] as any, addBeeData: (list: any) => {return list} });*/
export default DuringWalk;
