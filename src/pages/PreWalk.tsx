import React from 'react';
import '../components/ExploreContainer.css';
import { IonBackButton, IonButton,  IonButtons,  IonCol,  IonContent, IonDatetime, IonGrid, IonHeader, IonInput, IonLabel, IonPage, IonRouterOutlet, IonRow, IonToolbar } from '@ionic/react';
/*import '../components/LoginPage.css';*/
import './PreWalk.css';
import {Route} from 'react-router-dom';
import DuringWalk from './DuringWalk';

/*
    PreWalk - opens the first page containing details 
    required prior to starting the beewalk
*/
interface ContainerProps { 
}

const PreWalk: React.FC<ContainerProps> = (props) => {
  return (
    <><><IonRouterOutlet>
        <Route path="/start/duringwalk" component={DuringWalk} />
    </IonRouterOutlet></>
      <IonPage>
        <IonHeader>
        </IonHeader>
        <IonContent fullscreen>
            
        <IonHeader >
        </IonHeader>

        <div className="container">
            <div className="wholepage">
            <IonBackButton defaultHref="/frontpage" icon="buttonIcon" text="BACK" className="ion-float-left" color="dark"/><br/>
    
                <form id="prewalkform">
                    <IonGrid>
                        <IonRow>
                            <IonCol size="10">
                                <IonDatetime className="date" displayFormat="DD MM YYYY" placeholder="Select Date"  ></IonDatetime>
        
                            </IonCol>
                            
                            <IonCol size="1">
                            </IonCol>
                            
                        </IonRow>

                        <IonRow>
                            <IonCol size="10">
                                
                                <IonInput className="input" type="text"  required placeholder="Location(Automatic)" font-weight="bold" placeholder-opacity="1"/> 
                            </IonCol>
                            
                            <IonCol size="2">
                                <IonButton color="light">Edit</IonButton>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size="10">
                                <IonInput className="input" type="text"  required placeholder="Recorder Name(Automatic)" font-weight="bold" placeholder-opacity="1"/> 
                            </IonCol>
                            
                            <IonCol size="2">
                                <IonButton color="light">Edit</IonButton>
                            </IonCol>
                        </IonRow>

                        <IonRow>
                            <IonCol size="10">
                                <IonInput className="input" type="text"  required placeholder="Site(Automatic)" font-weight="bold" placeholder-opacity="1"/> 
                            </IonCol>
                            
                            <IonCol size="2">
                                <IonButton color="light">Edit</IonButton>
                            </IonCol> 
                        </IonRow>
                        <IonRow>
                            <IonCol size="10">
                                <IonInput className="input" type="text"  required placeholder="Weather Conditions
                                (Automatic)" font-weight="bold" placeholder-opacity="1"/> 
                            </IonCol>
                            
                            <IonCol size="2">
                                <IonButton color="light">Edit</IonButton>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size="10">
                                <IonInput className="input" type="text"  required placeholder="Start Time(Automatic)" font-weight="bold" placeholder-opacity="1"/> 
                            </IonCol>
                            
                            <IonCol size="2">
                                <IonButton color="light">Edit</IonButton>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                
                    <IonButton routerLink="/start/duringwalk"
                    color="warning" size="large" className="buttons" shape="round" expand="block">
                        Start Walk
                    </IonButton>
                </form>
                    
                </div>
            </div>
          
          
        </IonContent>
      </IonPage></>
    
    
  );
};

export default PreWalk;
