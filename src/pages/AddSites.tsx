import React, { useEffect, useLayoutEffect, useState } from 'react';
import '../components/ExploreContainer.css';
import '../pages/Default.css';
import {IonAlert, IonBackButton, IonButton, IonContent, IonDatetime, IonInput, IonLabel, IonRouterOutlet, IonSelect, IonSelectOption,
    
    IonModal,
    IonGrid,
    IonRow,
    IonCol} from '@ionic/react';
import { RouteStart } from '../Reducers/TransectReducer';
import { useDispatch } from 'react-redux';
import { setRouteStart } from '../Actions/Transect';
import { Redirect, Route } from 'react-router';
import TransectMap from './Transect';

interface ContainerProps { 
  
}

/*Form that is rendered when the manual adding of bee data
is selected*/
const AddSites: React.FC<ContainerProps> = () => {
    //check if required fields in form are filled
    const [fillTransect, setFillTransect] =useState(false);
    const [fillGrid, setFillGrid] = useState(false);

    //redirect to transect page
    const [ redirectMap, setRedirectMap] = useState(false);
    const [showModal, setShowModal] = useState(false);

  const[redirectAutomaticTransect, setAutomaticTransect] = useState(false);
  
    //list of counties available on select option
    const counties =['Aberdeenshire', 'Alderney', 'Angus', 'Antrim', 'Argyll and Bute', 'Armagh','Avon','Bath and North East Somerset',
'Bedforshire','Berkshire', 'Borders','Bournemouth','Bracknell Forest','Bridgend','Brighton and Hove','Bristol City','Buckinghamshire',
'Cambridgeshire','Cardiff','Central','Ceredigion','Cheshire','Clackmannanshire','Cleveland','Clwyd', 'Conwy','Cornwall','Count Antrim',
'County Armagh', 'County Down','County Durham', 'County Fermanagh', 'County Londonderry', 'County Tyrone','Cumbria','Darlington','Denbigshire',
'Derby City','Derbyshire','Devon','Dorset','Down','Dumfries and Galloway', 'Durham','Dyfed','East Ayrshire','East Lothian','East Riding of Yorkshire',
'East Susssex','East Yorkshire','Edinburgh City','Essex','Falkirk','Fermanagh','Fife','Flintshire','Glasgow City','Gloucestershire',
'Grampian','Greater London', 'Greater Manchester','Gwent','Gwynedd', 'Gwynedd County','Hampshire','Herefordshire','Hertfordshire',
'Highland','Highlands and Islands','Humberside','Isle of Anglesey', 'Isle of Man', 'Isle of Wight','Isle of Scilly', 'Jersey',
'Kent', 'Lancashire','Leicestershire','Lincolnshire','Londonderry','Lothian','Luton','Medway','Merseyside','Merthyr Tydfil','Mid Glamorgan',
'Midlothian','Milton Keynes','Monmouthshire','Moray','Newport','Norfolk','Norhumberland','North Ayrshire','North Lanarkshire',
'North Somerset','North Yorkshire','Northamptonshire','Northumberland','Nottinghamshire','Oxfordshire','Pembrokeshire','Perth and Kinross',
'Peterborough City', 'Portsmouth City','Powys','Reading','Renfrewshire','Rutland','Scottish Borders','Shropshire','Sommerset','South Gloucestershire',
'South Lanarkshire','South Yorkshire','Southampton City','Southend-on-Sea','Staffordshire','Stirling','Stockton-on-Tees','Strathclyde',
'Suffolk','Surrey','Sutherland','Swansea City','Swindon','Tayside','Tyne and Wear', 'Vale of Glamorgan','Wawickshire, West Berkshire',
'West Dunbartonshire','West Glamorgan','West Lothian','West Midlands','West Sussex','West Yorshire','Western Isles','Wiltshire',
'Windsor and Maidenhead','Wokingham','Worcester','Worcestershire','Wrexham','York City','Yorkshire']

    //get data from the form
    //transect name
    let transect:string
    const getTransect =(name:string)=>{
        transect = name;
    }

    //grid reference
    let gridref:string
    const getGridRef = (ref:string)=>{
        gridref = ref;
    }

    //county
    let county:string = "null"
    const getCounty = (countyname:string)=>{
        county = countyname;
    }

    //year
    let yearEstablished:number = new Date().getFullYear()
    const getYear = (year:number)=>{
        yearEstablished = year;
    }

    //get time of year in date format to change to ISOformat
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = new Date().getHours() + ":" + new Date().getMinutes()+":"+new Date().getSeconds();
    var all = new Date(date + " "+time)

    const dispatch = useDispatch()
    //submitting data
    const startTransect = ()=>{
        //check if transect name is filled
        
        if (transect){
            if(gridref){
                //send data to redux               
                let route = new RouteStart(transect, gridref,county, yearEstablished)
                dispatch(setRouteStart(route))
                //go to map page to enter transect
                
                setShowModal(true)
            }else{
                setFillGrid(true)
            }
        }else{
            setFillTransect(true)
        }
    }
     
    
    
    if(redirectMap==true){     
        return <Redirect to='/transect'/>
        
       
      }
      const goToTransect=()=>{
          setRedirectMap(true);
       // return  <Redirect to='/transect'/>
      }
      if(redirectAutomaticTransect==true){
        return <Redirect to='/automatic'/>
      }
    return (   
        <><IonRouterOutlet>
            <Route path="/transect" component={TransectMap} />

        </IonRouterOutlet>
            <IonContent fullscreen className="content">
                <IonBackButton defaultHref="/mysites" icon="buttonIcon" text="BACK" className="ion-float-left" color="dark" /><br />
           
        <IonModal isOpen={showModal} cssClass='choose-transect'>
            <h1>Enter Transect</h1>
            <h2>Choose how to enter transect</h2>
            <IonGrid>
                <IonRow>
                    <IonCol size="6">
                        <IonButton onClick={() => {
                            setRedirectMap(true);
                            setShowModal(false);                
                        }}>
                            Enter <br></br>Manually
                        </IonButton>
                    </IonCol>

                    <IonCol size="6">
                        <IonButton onClick={() => {
                            setAutomaticTransect(true);
                            setShowModal(false);                
                        }}>
                            Enter <br></br>Automatically
                        </IonButton>
                    </IonCol>
                </IonRow>
            </IonGrid>
            

           
        </IonModal>
    
                <IonAlert
                    isOpen={fillTransect}
                    onDidDismiss={() => setFillTransect(false)}
                    cssClass='my-custom-class'
                    header={"Transect Name missing"}
                    message={"Enter the transect name"}
                    buttons={['OK']} />

                <IonAlert
                    isOpen={fillGrid}
                    onDidDismiss={() => setFillGrid(false)}
                    cssClass='my-custom-class'
                    header={"Grid missing"}
                    message={"Enter the Grid Reference"}
                    buttons={['OK']} />

                <form id="manualform" action="/mysites">
                    <IonInput placeholder="Transect Name" type="text" required className="input" onIonInput={(e: any) => { getTransect(e.target.value); } }></IonInput>
                    <IonInput placeholder="Grid Reference" type="text" className="input" onIonInput={(e: any) => { getGridRef(e.target.value); } }></IonInput>

                    <IonLabel>County</IonLabel>
                    <IonSelect okText="Okay" cancelText="Dismiss" onIonChange={(e: any) => { getCounty(e.target.value); } }>
                        {counties.map((name, index) => (
                            <IonSelectOption key={index} value={name}>{name}</IonSelectOption>
                        ))}
                    </IonSelect>

                    <IonLabel className="align-left">Year Established</IonLabel>
                    <IonDatetime display-format="YYYY" picker-format="YYYY" value={all.toISOString()} onIonChange={(e: any) => { getYear(e.target.value); } }></IonDatetime>
                    <IonButton onClick={() => { startTransect(); } } color="warning" size="large">Save</IonButton>
                </form>

            </IonContent></>
           
    );
};

export default AddSites;
