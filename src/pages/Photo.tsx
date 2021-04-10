import React, { useState } from 'react';

import './Default.css';
import { IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonIcon, IonImg, IonRow} from '@ionic/react';
import {  usePhotoGallery } from './Camera';
import { camera } from 'ionicons/icons';
import RecordingForm from '../components/Form';
import { useDispatch } from 'react-redux';
import { Record } from '../Reducers/RecordsReducer';
import { addRecord } from '../Actions/Records';

const Photo: React.FC = () => {

    let {  photos, takePhoto } = usePhotoGallery();
    const dispatch = useDispatch()

    /**Add photos to the store */
    const addPhotos=()=>{
      takePhoto();
      
      console.log(photos)
    }  
    if (photos){
      /*let record = new Record(photos)
      dispatch(addRecord(record))*/
    }
    console.log(photos)
  return(
    <><>
    <IonContent className="whitebackground">
      <RecordingForm species="" photos={photos}/>
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
    <IonFabButton onClick={() => addPhotos()}>
      <IonIcon icon={camera}></IonIcon>
    </IonFabButton>
  </IonFab>
    </IonContent>
    
  </></>
  )
}
export default Photo;