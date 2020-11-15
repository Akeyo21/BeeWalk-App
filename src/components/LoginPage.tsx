import React from 'react';
import './ExploreContainer.css';
import {IonInput,IonButton} from '@ionic/react';
import './LoginPage.css';


interface ContainerProps { 
  
}

const LoginPage: React.FC<ContainerProps> = () => {
  /*<input type="submit" value="Log In" id="submit"></input>*/
  return (   

      <div className="container">
        <div className="wholepage">  
            <form id="move">
                <IonInput className="input" type="text"  required placeholder="Username/email address" font-weight="bold" placeholder-opacity="1">

                </IonInput>
               <IonInput className="input" type="password" required placeholder="Password"></IonInput>
               
               <IonButton routerLink="/frontpage"
                color="warning" size="large" className="buttons" shape="round" expand="block">
                    Log In 
                </IonButton>
            </form>        
                       
        </div>

      </div>
    
  );
};

export default LoginPage;
