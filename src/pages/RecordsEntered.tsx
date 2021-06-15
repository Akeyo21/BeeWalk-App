import React, { useState } from 'react';
import '../components/ExploreContainer.css';
import { IonAlert, IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonImg, IonItem, IonList, IonPage, IonRouterOutlet, IonRow, IonText, IonToolbar, useIonAlert, useIonPopover } from '@ionic/react';

import './Default.css';
import { Redirect, Route } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { Record } from '../Reducers/RecordsReducer';
import SpeciesEntered from '../components/SpeciesEntered';
import { addWalk, resetWalk } from '../Actions/Walks';
import { UpdatedWalk } from '../Reducers/WalksReducer';
import { resetRecords } from '../Actions/Records';
import { Temps } from '../Reducers/temps';
import { changeTemp } from '../Actions/temps';
import { finishWalk } from '../Actions/Resume';
import { ellipsisVertical, ellipsisVerticalOutline } from 'ionicons/icons';
interface ContainerProps {
	records: [],
	walk: any
}
/* CommonBees - page that shows the common bees in the are
*/


const RecordsEntered: React.FC<ContainerProps> = (props) => {

	const [showAlert1, setShowAlert1] = useState(false);
	const [redirectHome, setRedirectHome] = useState(false);
	const PopoverList: React.FC<{
		onHide: () => void;
	  }> = ({ onHide }) => (
		<IonList>
		  <IonItem button onClick={() => {
			  dismiss();
			  setShowAlert1(true)}}>Save Records</IonItem>
		  <IonItem button onClick={()=>{
			  dismiss()
			  confirmCancel()}}>Cancel Walk</IonItem>
		  <IonItem lines="none" detail={false} button onClick={onHide}>
			Close
		  </IonItem>
		</IonList>
	  );
	const [presentPopover, dismiss] = useIonPopover(PopoverList, { onHide: () => dismiss() });
	const [emptyRecords, setEmptyRecords] = useState(false);
	let recordslist: [] = []
	if (props.records) {
		recordslist = Object.values(props.records)[0]
	}
	const dispatch = useDispatch()
	const sendRecordsToStorage = () => {
		//write 
		for (const property in props.walk) {
			console.log(props.walk[property])
			let walk = props.walk[property]

			//endtime
			var today = new Date();
			var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
			var time = new Date().getHours() + ":" + new Date().getMinutes()
			var all = new Date(date + " " + time)

			dispatch(addWalk(new UpdatedWalk(walk.recorder, walk.transect, walk.date, walk.startTime, walk.temp,
				walk.sunshine, walk.windSpeed
				, time, recordslist)))
		}
	}
	const clearRecords = () => {
		sendRecordsToStorage()

		//alert user
		let temporary = new Temps(0, false, true);
		dispatch(changeTemp(temporary));

		dispatch(finishWalk())
		dispatch(resetWalk())
		dispatch(resetRecords())
		//clearPhotos()
		//setShowAlert1(true)
		setRedirectHome(true)
	}

	const cancelWalk=()=>{
		//let temporary = new Temps(null);
		dispatch(finishWalk())
		dispatch(resetWalk())
		dispatch(resetRecords())
		setRedirectHome(true)
	}
	console.log(props.records)
	//obtaining records list
	const [present] = useIonAlert();
	const confirmCancel =()=>{
		present({
			cssClass: 'my-css',
			header: 'Confirm ',
			message: 'Are you sure you want to end the walk without submitting anything?',
			buttons: [ { text: 'Yes', handler: () => cancelWalk() },
			  'Cancel',
			 
			],
			onDidDismiss: (e) => console.log('did dismiss'),
		  })
	}
	
	//console.log(recordslist[0].species)
	recordslist.map((record: Record) => (
		console.log(typeof record)))
	if (redirectHome == true) {
		return <Redirect to='/home' />
	}
	

	return (
		<><><IonRouterOutlet>
		</IonRouterOutlet></>
			<IonPage>
				<IonHeader>
				</IonHeader>
				<IonContent fullscreen>
					<IonHeader >
					</IonHeader>
					<div className="container">

						<div className="wholepage ">

							<IonAlert
								isOpen={showAlert1}
								onDidDismiss={() => setShowAlert1(false)}
								cssClass='submitalert'
								header={'Submission'}
								message={'Do you wish to end the walk and save your records?'}
								buttons={[
									{
										text: 'OK',
										handler: () => {
											clearRecords()
										}
									},

									{
										text: 'Cancel',
										role: 'cancel'
									}
								]} />
							<div className="top">
								<IonButton href="/mapwalk" className="light move-left" >Back</IonButton>
								<IonIcon className=" top-icon " onClick={(e) =>
									presentPopover({
									event: e.nativeEvent,
									})
								}icon={ellipsisVertical}/>
								
								</div>

							{recordslist.length==0? <h2 className="dark">No Records Entered</h2>:
							recordslist.map((record: Record,index) => (
								<SpeciesEntered key={index} list={recordslist} index={index}species={record.species} photos={record.photos} flower={record.flower} section={record.section} />
							))}

						</div>
						
					</div>


				</IonContent>
			</IonPage></>


	);
};
const mapStateToProps = function (state: any) {

	console.log(state.records)
	return {
		records: state.records,
		walk: state.walk,
	}
}

export default connect(mapStateToProps)(RecordsEntered);/*
export default RecordsEntered;*/
