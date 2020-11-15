import React from 'react';
import './ExploreContainer.css';
import {IonButton, IonImg, IonRouterOutlet} from '@ionic/react';
import Login from "../pages/Login";
import Register from "../pages/Register";
import {Route} from 'react-router-dom';
import { render } from '@testing-library/react';

interface ContainerProps { 
  page: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({page}) => {
  
  return (
    <><IonRouterOutlet>
      <Route exact path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </IonRouterOutlet>
      
      <div className="container">
        <div className="wholepage">
          <h1 className="bee"> Bee </h1>
          <h1>Walk</h1>

          <IonButton routerLink=""
            color="warning" size="large" className="buttons" shape="round" expand="block">
            Register
          </IonButton><br></br>

          <IonButton routerLink=""
            color="warning" size="large" className="buttons" shape="round" expand="block">
            Log in
          </IonButton>
        </div>

      </div></>
   
    
  );
};

export default ExploreContainer;
