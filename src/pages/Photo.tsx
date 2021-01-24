import React, { useState } from 'react';

import './Default.css';
import { IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonIcon, IonImg, IonRow} from '@ionic/react';
import { usePhotoGallery } from './Camera';
import { camera } from 'ionicons/icons';
import RecordingForm from '../components/RecordingForm';

const Photo: React.FC = () => {

    const {  photos, takePhoto } = usePhotoGallery();  
  return(
    <><>
    <IonContent>
      <RecordingForm/>
    <IonGrid>
      <IonRow>
        {photos.map((photo, index) => (
          <IonCol size="6" key={index}>
            <IonImg src={photo.webviewPath} />
          </IonCol>
        ))}
      </IonRow>
    </IonGrid> 
    <IonFab vertical="bottom" horizontal="center" slot="fixed">
    <IonFabButton onClick={() => takePhoto()}>
      <IonIcon icon={camera}></IonIcon>
    </IonFabButton>
  </IonFab>
    </IonContent>
    
  </></>
  )
}
export default Photo;