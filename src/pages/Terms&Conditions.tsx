import { IonContent, IonHeader, IonPage, IonRouterOutlet } from '@ionic/react';
import React from 'react';

import './Home.css';
import  '../components/ExploreContainer.css';

const Home: React.FC = () => {
  return (
    
      <IonPage>
        <IonHeader>
        </IonHeader>
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            
          </IonHeader>
          <div className="container">
            <div className="wholepage">
                <div className="text">
                    <h5>BeeWalk Recording Tool Terms and Conditions of Use</h5>
                    By using this application, you agree to these Terms and Conditions of Use. 
                    If you do not agree, please do not use the application.<br></br>

                    When you use this application, you create and upload content - for instance, 
                    bumblebee observations and photos, your descriptions, and messages to the forums. 
                    By putting this information on the application, you are saying that:<br></br>
                    <ol>
                        <li>the content is yours, or you have the permission of the owner to agree to this usage, and</li>
                        <li>you agree that the content can be used on this application, and</li>
                        <li>you agree that your wildlife observations can be made publicly available for wider use.</li>
                    </ol>            
                    Wildlife observations collected through this application will be stored securely at the Biological
                    Records Centre and made available to experts for verification. <br></br>
                    Verified observations will be made available via the NBN Gateway.  BeeWalk records will be collated
                    alongside other data and made available via the NBN Gateway by the Bumblebee Conservation Trust and 
                    the Bees, Wasps and Ants Recording Society.  If you do not want your observations to be made available
                    in this way, please do not submit them.<br></br>
                    Once verified records have been made available, their use will be governed by the NBN Gateway Terms 
                    and Conditions, e.g. use of the data for commercial purposes will not be allowed without written 
                    permission from the organisation administering the dataset. <br></br>
                    Please do not submit records to this application that have already been submitted to a Vice County 
                    Recorder, Local Records Centre, National Recording Scheme or another online wildlife recording system,
                    owing to the potential for duplication.<br></br>
                    Having submitted a record to this application, please do not submit it to other organisations or 
                    online recording schemes.  It will be made available to local records centres, conservation 
                    organisations, natural history societies and others with a legitimate interest in the data via the 
                    NBN Gateway.<br></br>
                    You may view wildlife records submitted to this application by other users, but you may not store 
                    them, republish them, exploit them for commercial or academic research purposes, or pass them on to 
                    any third party.<br></br>
                    Your contact details will be held in a database at the Biological Records Centre and will only be 
                    used to contact you if there is a query about the verification of your wildlife observations. <br></br>
                    Your contact details will not be passed on to any third parties without your permission.<br></br>
                    Your name will be stored as part of the record and may be made publicly available via the NBN
                    Gateway along with the species name, date and location of the record. <br></br>
                    If you submit a record of a species that could be vulnerable to disturbance or persecution 
                    if the record is made publicly available, the record will be flagged as ‘sensitive’ and will
                    not be made publicly available.
                
                </div>
                </div>
                </div>
          </IonContent>
      </IonPage>
  );
};

export default Home;
