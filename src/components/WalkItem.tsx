import React from 'react';
import './ExploreContainer.css';
import { IonButton, IonIcon, IonItem, IonLabel, IonNote } from '@ionic/react';
import { chevronForwardOutline } from 'ionicons/icons';


interface ContainerProps {
	link: string;
	transect: string;
	date: string;
	startTime: string;
	endTime: string
}

const WalkItem: React.FC<ContainerProps> = (props) => {
	return (

		<IonItem className="item" href={props.link} >
			<IonLabel slot="start" >
				{props.transect}
			</IonLabel>
			<IonNote slot="end" >{props.date}<br></br>{props.startTime} - {props.endTime}</IonNote>

		</IonItem>

	);
};

export default WalkItem;
