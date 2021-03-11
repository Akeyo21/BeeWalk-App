import React from 'react';
import './ExploreContainer.css';
import {IonButton} from '@ionic/react';
import { useDispatch } from 'react-redux';


interface ContainerProps { 
  
}

const HomePage: React.FC<ContainerProps> = () => {
  
  return (
    

      <div className="container">
        <div className="wholepage">
          <h1 className="bee"> Bee </h1>
          <h1>Walk</h1>

          <IonButton routerLink="/register"
            color="warning" size="large" className="home-buttons" shape="round" expand="block">
            Register
          </IonButton><br></br>

          <IonButton routerLink="/login"
            color="warning" size="large" className="home-buttons" shape="round" expand="block">
            Log in
          </IonButton>
          
        </div>

      </div>
    
  );
};

export default HomePage;
