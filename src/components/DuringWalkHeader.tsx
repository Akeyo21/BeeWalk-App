import React from 'react';
/*import './ExploreContainer.css';*/
import {IonButton, IonCard, IonCardContent, IonCol, IonGrid, IonRow, IonRouterLink, IonSegment, IonSegmentButton, IonToolbar} from '@ionic/react';
/*import './LoginPage.css';*/
import "../pages/Default.css";

/* DuringWalkHeader - Is the template for the header 
    of the DuringWalk page that collects data during the walk
*/
interface ContainerProps {   
}

const DuringWalkHeader: React.FC<ContainerProps> = () => {
  /*<input type="submit" value="Log In" id="submit"></input>*/
  return (   
    <>
        <IonButton className="whitebackground">
          Add Manually
        </IonButton>

          <IonButton className="whitebackground ion-float-right">
              Submit
          </IonButton>
    </>  
  );
};

export default DuringWalkHeader;
