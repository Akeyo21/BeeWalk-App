import React, { useEffect, useState } from 'react';
import '../pages/Default.css';
import { IonButton, IonCol, IonGrid, IonIcon, IonInput, IonItem, IonLabel, IonList, IonModal, IonRow, IonText, useIonAlert, useIonPopover} from '@ionic/react';
import { ellipsisVertical } from 'ionicons/icons';
import { BeeSpecies } from '../Reducers/SpeciesReducer';
import { useDispatch } from 'react-redux';
import { Redirect, useParams } from 'react-router';
import {store} from '../index'
import { Photo } from '../pages/Camera';
import { Record } from '../Reducers/RecordsReducer';
import { deleteRecord, updateRecords } from '../Actions/Records';
interface ContainerProps { 
  index:number;
  species: BeeSpecies;
  section:number;
  previouspage:string;
  list:Record[];
  photos: Photo[];
  flower: string|null;
}

const RecordChange: React.FC<ContainerProps> = (props) => {
    
    const [showModal, setShowModal] = useState(false);
    const params = useParams()
    console.log(params)
	let values = Object.values(params)
    let species:BeeSpecies;
	if(values.length>0){
		console.log(values);
        species = (Object.values(store.getState().species))[0]
       // console.log(Object.values(species))
	}else{
        species = props.species
		console.log("Not there")
	}
    let index:number
    useEffect(()=>{

        if(values.length>0){
            index = Number(values[0])
            setShowModal(true)
        }
    })
    console.log(store.getState().species)
    const PopoverList: React.FC<{
		onHide: () => void;
	  }> = ({ onHide }) => (
		<IonList>
		  <IonItem button onClick={()=>{
              dismiss()
              setShowModal(true)}}>Edit Records</IonItem>
		  <IonItem button onClick={()=>{
              dismiss()
              confirmDelete(species.name, species.caste)
              }}>Delete Record</IonItem>
		  <IonItem lines="none" detail={false} button onClick={onHide}>
			Close
		  </IonItem>
		</IonList>
	  );
	const [presentPopover, dismiss] = useIonPopover(PopoverList, { onHide: () => dismiss() });
    const[redirectRecord, setRedirectRecord] = useState(false)
    const[records, setRecordsPage] = useState(false)
    const dispatch = useDispatch()
    const [present] = useIonAlert();
	const confirmDelete =(name:string, caste:any[])=>{
        let first = 'Are you sure you want to delete the record with species '
        let second = name
        //let last = caste
        let mess = first + " "+second + "and caste :"
        for(let i=0;i<caste.length;i++){
            mess += " " + Object.values(caste[i])[0] + " " +Object.keys(caste[i])[0]
        }
		present({
			cssClass: 'my-css',
			header: 'Confirm ',
			message: mess,
			buttons: [ { text: 'Yes', handler: () => {
                 dispatch(deleteRecord(props.index))}},
			  'Cancel',
			 
			],
			onDidDismiss: (e) => console.log('did dismiss'),
		  })
	}
    if(redirectRecord==true){
        let route = `duringwalk/${props.index}`
        return<Redirect to={route}/>
    }
    if(records==true){
        return<Redirect to="/start/records"/>
    }
    let section = props.section
       
    const getSectionValue=(value:number)=>{
        section = value
    }

    const changeRecords =()=>{
        //update the recordslist then dispatch
        let record = new Record(section, species, props.flower, props.photos)
        props.list[index] = record
        console.log(index)
        dispatch(updateRecords(props.list))
        //load the records page
        setRecordsPage(true)
    }
    
    return (   
        
        <><IonIcon icon={ellipsisVertical} className="top-icon" onClick={(e) => presentPopover({
            event: e.nativeEvent,
        })} />

            <IonModal isOpen={showModal} cssClass='modal2' showBackdrop backdrop-dismiss={true}>

                <h1>Edit Record</h1>
                <IonGrid className="text-center">
                    <IonRow className="text-center" onClick={()=>{setRedirectRecord(true)}}>
                    <IonItem>
                  <IonLabel className="dark text-center">Bee Species : <br/>{species.name}</IonLabel>
                  

            </IonItem>
            <IonRow>
            {species.caste.map((casteobject: { [s: string]: unknown; } | ArrayLike<unknown>, index) => (
                
                <p className="text-center"key={index}> {Object.values(casteobject)[0]} {Object.keys(casteobject)[0]}</p>
          ))}
            </IonRow>
                   
                    </IonRow>

                    <IonRow>
                    <IonItem>
                  <IonLabel>Section</IonLabel>
              <IonInput className="placeholder" value={props.section}type="number"  onIonInput={(e: any) => getSectionValue(e.target.value)}required>

              </IonInput>
            </IonItem>
                    </IonRow>

                    <IonRow>
                        <IonCol size="6">
                        <IonButton color="warning" onClick={()=>{changeRecords()}}>Edit Record</IonButton>
                        </IonCol>

                        <IonCol size="6">
                            <IonButton  color="warning" onClick={()=>setShowModal(false)}>Cancel</IonButton>
                        </IonCol>
                        
                    </IonRow>
                </IonGrid>
                
                        
            


            </IonModal></>
        
    );
};

export default RecordChange;
