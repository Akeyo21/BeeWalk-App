import React from 'react';
import './ExploreContainer.css';
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon, IonImg, IonSlide, IonSlides, IonText} from '@ionic/react';
import { BeeSpecies } from '../Reducers/SpeciesReducer';
import { Photo } from '../pages/Camera';
import RecordChange from '../components/RecordChange'

interface ContainerProps { 
  species: BeeSpecies;
  photos: Photo[];
  flower: string|null;
  section:number;
  index:number;
  list:[]
}
/**Component holding info for bee species entered without photos */
const SpeciesEntered: React.FC<ContainerProps> = (props) => {
    const slideOpts = {
        initialSlide: 1,
        speed: 400
      };
  return (
    

    <IonCard className="card">
     
    <RecordChange index={props.index} species={props.species} photos={props.photos} flower={props.flower}section={props.section} list={props.list}previouspage="duringwalk"/>
        {props.photos.length==1?  props.photos.map((photo) => (<IonImg src={photo.webviewPath} />)) :
        props.photos.length>1? 
        <IonSlides pager={true} options={slideOpts}>
            {props.photos.map((photo) => ( <IonSlide>
                <IonImg src={photo.webviewPath} />
            </IonSlide>))}
        </IonSlides> :<IonText></IonText>}
    <IonCardHeader>
      <IonCardTitle className="dark">
      {props.species.name} spotted on the walk<br/>
      on section {props.section}
      
        </IonCardTitle>
        
    </IonCardHeader>

    <IonCardContent>
      {props.species.caste.map((casteobject: { [s: string]: unknown; } | ArrayLike<unknown>, index) => (
                
                    <p key={index}> {Object.values(casteobject)[0]} {Object.keys(casteobject)[0]}</p>
      ))}
    </IonCardContent>
  </IonCard>
  );
};

export default SpeciesEntered;
