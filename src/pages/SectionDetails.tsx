import React, { useState } from 'react';
import '../components/ExploreContainer.css';
import '../pages/Default.css';
import {IonAlert, IonBackButton, IonButton, IonContent, IonDatetime, IonInput, IonItem, IonLabel, IonRouterOutlet, IonSelect, IonSelectOption, IonText} from '@ionic/react';
import { RouteStart, Transect } from '../Reducers/TransectReducer';
import { connect, useDispatch } from 'react-redux';
import { Redirect, Route } from 'react-router';
import TransectMap from './Transect';
import { Section } from '../Reducers/SectionsReducer';
import { addTransect, resetRouteStart, resetSections } from '../Actions/Transect';
import Sites from './MySites';
interface ContainerProps { 
  sections:[],
  routeStart: any
}

/*Form that is rendered when the manual adding of bee data
is selected

{counties.map((name, key) => (
                            <IonSelectOption value={name}>{name}</IonSelectOption>
                        ))}*/
const SectionDetails: React.FC<ContainerProps> = (props) => {
    const [ backToSites, setBackToSites] = useState(false)
    //extract both sections and route starts from the store 
    let sectionslist: Section[] =[]
    for(const property in props.sections){
        sectionslist = props.sections[property]
    }
    let route:RouteStart
    for(const property in props.routeStart){
        route = props.routeStart[property]
    }
    console.log(route.county);

    let habitats:Object[] = []
    //get data from the form
    //habitats
    const getHabitat=(habitatsChosen:[], pos:number)=>{
        let copy = false
        if (habitatsChosen.length!=0){
        if(habitats.length<=0){
            let list = []
            for(const value in habitatsChosen){
                list.push(habitatTypes[value])
            }
            let value = new Object()        
            value.pos = pos;
            value.list = list;
            habitats.push(value)
        }else{
            //remove duplicates
            for (let i=0;i<habitats.length;i++){
                let x = habitats[i]
                if(x.pos ==pos){
                    x.list = []
                    copy = true
                    for(const value in habitatsChosen){
                        
                        x.list.push(habitatTypes[value])
                    }
                }
            }
            if(!copy){
                let list = []
            for(const value in habitatsChosen){
                list.push(habitatTypes[value])
            }
            let value = new Object()        
            value.pos = pos;
            value.list = list;
            habitats.push(value)
            }
        }
    }
        console.log(habitats)
    }
       
    
    //land use
    let landuses:Object[] = []
    const getLandUse=(landuseChosen:[], pos:number)=>{
        if (landuseChosen.length!=0){
        let copy = false
        if(landuses.length<=0){
            let list =[]
            for(const value in landuseChosen){
                list.push(landuse[value])
            }
            let value = new Object()
            value.pos = pos;
            value.list = list;
            landuses.push(value);
        }else{
            for (let i=0;i<landuses.length;i++){
                let x = landuses[i]
                if(x.pos ==pos){
                    x.list = []
                    copy = true
                    for(const value in landuseChosen){                    
                        x.list.push(landuse[value])
                    }
                }
            }
            if(!copy){
                let list = []
            for(const value in landuseChosen){
                list.push(landuse[value])
            }
            let value = new Object()        
            value.pos = pos;
            value.list = list;
            landuses.push(value)
        
            }
        }
    }
        console.log(landuses)
    }
    
    const dispatch = useDispatch();
    const setUpTransect = ()=>{
        //set the sections first - make changes to the habitat and land types
        if (habitats.length>0){
            for (let i=0;i<habitats.length;i++){
                let x = habitats[i]
                let modifiedSection = sectionslist[x.pos]
                modifiedSection.habitat = (x.list)
            }
        }
        if (landuses.length>0){
            for (let i=0;i<landuses.length;i++){
                let x = landuses[i]
                let modifiedSection = sectionslist[x.pos]
                modifiedSection.landuse = (x.list)
            }
        }

        let transectDistance = 0;
        for (let i=0;i<sectionslist.length;i++){
            transectDistance+=sectionslist[i].length;
        }
        //obtain the transect section from route start
        const transect = new Transect(route.name, route.gridRef, route.county, route.year, sectionslist.length,
            Math.floor(transectDistance), sectionslist)
        dispatch(addTransect(transect))
        dispatch(resetSections())
        dispatch(resetRouteStart())
        setBackToSites(true)
        console.log(transect)
        //set the transect up - dispatch
        //change page - add new Site
    }
    if(backToSites==true){      
        return <Redirect to='/mysites'/>
      }
    const habitatTypes = ['Marine saltmarshes/estuaries/saline reedbeds','Coastal dune grassland','Coastal dune and sand heath',
'Coastal dune and sand scrub', 'Coastal dune and sand woods','Coastal dune slacks','Coastal machair','Coastal shingle','Coastal cliffs/undercliffs',
'Fen/swamp/marsh vegetation of inland freshwater edges','Bare ground/sparse vegetation of inland freshwater edges','Acid bog/mire habitats',
'Flushes','Inland swamp/fen stands without open water (e.g. reedbeds)','Dry semi/unimproved (flower-rich) chalk/limestone grassland',
'Dry semi/unimproved acid grassland', 'Dry semi/unimproved (flower-rich) neutral grassland','Agriculturally improved/re-seeded/ heavily fertilised grassland',
'Seasonally wet and wet marshy grasslands','Bracken dominated glades or hillsides','Stands of tall herbs (e.g. nettle and willow-herb beds)',
'Dry scrub/shrub thickets','Wet and dry heathland/ dry heather moorland','Wet Willow scrub of fen, river and lake-side ', 'Hedgerows',
'Mature broadleaved woodland ','Mature coniferous woodland','Mature mixed broadleaved and coniferous woodland','Lines of trees or scattered trees of parkland ',
'Small man-made woodlands','Recently felled areas/early-stage woodland and coppice','Bare ground/herb/grass mosaics of wood rides, hedgebanks and green lanes',
'Orchards, hop gardens and vineyards','Inland screes/cliffs/ rock pavements, and outcrops ', 'Intensive arable crops',
'Horticultural crops','Organic arable crops ','Bare ground/weeds of arable field margins or fallow/recently abandoned arable crops',
'Ornamental shrubs/trees/lawns of parks/domestic gardens, etc','Bare ground/weed communities of post-industrial sites']
    
    const landuse = ['Agriculture','Fisheries','Managed forest','Un-managed forest','Mineral workings and quarries','Outdoor amenity and open spaces',
'Amusement and show places','Libraries, museums and galleries','Sports facilities and grounds','Holiday parks and camps','Allotments and city farms',
'Transport tracks and ways','Transport terminals','Car parks','Vehicle storage','Goods and freight terminals','Waterways','Energy production and distribution',
'Water storage and treatment','Refuse disposal','Cemeteries and cremetoria','Post and telecommunications','Dwellings','Hotels','Residential Institutions','Medical and healthcare services',
'Places of worship','Education','Community services','Shops','Financial and professional services','Restaurants and cafes','Public houses and bars',
'Manufacturing','Offices','Storage','Wholesale distribution','Vacant','Derelict','Defence','Unused Land']
return (   
        <><IonRouterOutlet>
            <Route path="/mysites" component={Sites} />

        </IonRouterOutlet>
            <IonContent fullscreen className="content">
                <IonBackButton defaultHref="/mysites" icon="buttonIcon" text="BACK" className="ion-float-left" color="dark" /><br />

                <form id="manualform" >
                    
                        {sectionslist.map((section, pos)=>(

                            <>
                                <IonItem>
                                    <IonLabel>
                                        Section {pos+1} length (m)
                                    </IonLabel>

                                    <IonText>{Math.floor(section.length)}</IonText>
                                </IonItem>

                                <IonItem>
                                    <IonLabel>Habitat</IonLabel>
                                    <IonSelect  multiple className="select" onIonChange={(e: any) => { getHabitat(e.target.value, pos); } }>
                                        {habitatTypes.map((habitat, key)=>(
                                            <IonSelectOption value={key+1}>{habitat}</IonSelectOption>
                                        ))}
                                    </IonSelect>
                                </IonItem>

                                <IonItem>
                                    <IonLabel>Land Use</IonLabel>
                                    <IonSelect multiple className="select"onIonChange={(e: any) => { getLandUse(e.target.value, pos); } }>
                                        {landuse.map((use, key)=>(
                                            <IonSelectOption value={key+1}>{use}</IonSelectOption>
                                        ))}
                                    </IonSelect>
                                </IonItem>
                                
                            </>
                        ))}
                        
                    
                    <IonButton onClick={() => { setUpTransect() } } color="warning" size="large">Save</IonButton>
                </form>

            </IonContent></>
           
    );
};
const mapStateToProps = function(state: any) {
    return {
      sections:state.sections,
      routeStart:state.routeStart
    }
  }
  
  export default connect(mapStateToProps)(SectionDetails);/*
export default AddSites;*/
