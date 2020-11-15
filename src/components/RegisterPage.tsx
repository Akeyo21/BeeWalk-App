import React from 'react';
import './ExploreContainer.css';
import {IonInput, IonLabel, IonToggle, IonGrid, IonRow, IonCol, IonRouterLink } from '@ionic/react';
import './LoginPage.css'

interface ContainerProps { 
  
}

const RegisterPage: React.FC<ContainerProps> = () => {
  return (   
    
      <div className="container">
        <div className="wholepage">
          <form id="center" action="/acknowledgement">
            <IonInput placeholder="Username" type="text" required className="input"></IonInput>
            <IonInput placeholder="Email address" type="email" required className="input"></IonInput>
            <IonInput placeholder="First Name" type="text" className="input"></IonInput>
            <IonInput placeholder="Last name" required className="input"></IonInput>
            <IonGrid>
              <IonRow>
                <IonCol size="3">
                  <IonToggle color="warning"></IonToggle>
                </IonCol>

                <IonCol>
                  <IonRow>
                    <IonCol>
                      <IonLabel>BeeWalk Pro</IonLabel><br></br>
                    </IonCol>
                  </IonRow>

                  <IonRow>
                    <IonCol>
                      <IonLabel>Be a BeeWalk Pro user and record flowers visited</IonLabel><br></br>
                    </IonCol>
                  </IonRow>
                </IonCol>

              </IonRow>

              <IonRow>
                <IonCol>
                  <IonRouterLink href="/terms">
                    Terms and Conditions
                  </IonRouterLink>
                </IonCol>
              </IonRow>

              <IonRow>
                <IonCol size="3">
                  <IonToggle color="warning"></IonToggle>
                </IonCol>

                <IonCol>
                  <IonLabel>Accept terms and conditions</IonLabel>
                </IonCol>
              </IonRow>

            </IonGrid>



            <input type="submit" value="Create New Account" id="submit" ></input>
          </form>

        </div>

      </div>
    
  );
};

export default RegisterPage;
