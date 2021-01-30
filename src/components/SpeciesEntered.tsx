import React from 'react';
import './ExploreContainer.css';
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonImg, IonSlide, IonSlides, IonText} from '@ionic/react';
import { BeeSpecies } from '../Reducers/SpeciesReducer';
import { Photo } from '../pages/Camera';


interface ContainerProps { 
  species: BeeSpecies;
  photos: Photo[];
  flower: string|null;
  section:number
}
/**Component holding info for bee species entered without photos */
const SpeciesEntered: React.FC<ContainerProps> = (props) => {
    const slideOpts = {
        initialSlide: 1,
        speed: 400
      };
  return (
    

    <IonCard className="card">
        {props.photos.length==1?  props.photos.map((photo) => (<IonImg src={photo.webviewPath} />)) :
        props.photos.length>1? 
        <IonSlides pager={true} options={slideOpts}>
            {props.photos.map((photo) => ( <IonSlide>
                <IonImg src={photo.webviewPath} />
            </IonSlide>))}
        </IonSlides> :<IonText></IonText>}
    <IonCardHeader>
      <IonCardTitle className="dark">
      {props.species.getName()} spotted on the walk<br/>
      on section {props.section}
        </IonCardTitle>
    </IonCardHeader>

    <IonCardContent>
      Bee Caste with number<br></br>
      {props.species.getCaste().map((casteobject: { [s: string]: unknown; } | ArrayLike<unknown>) => (
                
                    <IonText>{Object.keys(casteobject)[0]}: {Object.values(casteobject)[0]}</IonText>
      ))}
    </IonCardContent>
  </IonCard>
  );
};

export default SpeciesEntered;
