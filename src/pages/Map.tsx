import React, { useEffect, useState } from 'react';
import '../components/ExploreContainer.css';
import { IonAlert, IonContent, IonHeader, IonPage, IonRouterOutlet } from '@ionic/react';
import { connect, useDispatch } from 'react-redux';
import { Loader } from '@googlemaps/js-api-loader';
import { Redirect, Route, useParams } from 'react-router';
import SectionDetails from './SectionDetails';

import { resetRecords } from '../Actions/Records';
import { photosPresent } from '../Actions/Photos';
import { usePhotoGallery } from './Camera';
import { setFalse } from '../Actions/MemoryFull';
import { cSnapToRoute } from './Trial';
import { changeTemp } from '../Actions/temps';
import { Temps } from '../Reducers/temps';
import { resetWalk } from '../Actions/Walks';
import { selectBeeSpecies } from '../Actions/Species';
interface ContainerProps {
	records: [] | any
	walk: any
	memoryFull: boolean
	transects: []
}

const Map: React.FC<ContainerProps> = (props) => {
	let transectslist: any[] = []
	for (const property in props.transects) {
		transectslist = props.transects[property]
	}
	// console.log(transectslist[0]);

	//let selectedPath = new google.maps.MVCArray([]);
	let walk;
	const params = useParams()
	let values = Object.values(params)
	
	
	for (const property in props.walk) {
		console.log(props.walk[property])
		walk = props.walk[property]
		console.log(walk)
	}
	let selectedPath: { last: any, first: any }[] = [];
	
	let pathlist: any[] = [];
	if (transectslist[walk.transect]) {
		console.log("transect", transectslist[walk.transect])
		for (const section in transectslist[walk.transect].sections) {
			pathlist.push( transectslist[walk.transect].sections[section].positions);
			let last = transectslist[walk.transect].sections[section].positions.length - 1
			let firstpos = transectslist[walk.transect].sections[section].positions[0]
			let lastpos = transectslist[walk.transect].sections[section].positions[last]
			selectedPath.push({ first: firstpos, last: lastpos })
		}
	}
	
	//get user current position
	const [findLive, setFindLive] = useState(false);
	const [redirectRecords, setRedirectRecords] = useState(false)
	const [home, setHome] = useState(false)

	const [enterRecord, setEnterRecord] = useState(false);
	const [memoryAlert, setMemoryAlert] = useState(false)
	const dispatch = useDispatch()
	//prompts user to scroll to the position if navigation
	//fails
	const [showScrollToPos, setScrollToPos] = useState(false)


	let { photos, takePhoto } = usePhotoGallery();

	useEffect(() => {
		// Update the document title using the browser API
		const loader = new Loader({
			apiKey: "AIzaSyAmfNAhG-WbTTCN-7JmHApcvr9e1tYirGw"
		});
		loader.load()
			.then(() => {
				dispatch(selectBeeSpecies(null))
				if(document.getElementById("map")){
				map = new google.maps.Map(document.getElementById("map") as HTMLElement, {

					zoom: 14,
				})
				if (navigator.geolocation) {
					navigator.geolocation.getCurrentPosition(function (position) {
						console.log(position.coords.latitude, position.coords.longitude)
						liveposition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
						if(values.length==0){
							map.setCenter(liveposition);
						}else{
							map.setCenter(selectedPath[0].first);
						}
						markerLivePos = new google.maps.Marker({
							position: liveposition,
							map: map,
						})
					});
				}

				for (let i = 0; i < selectedPath.length; i++) {
					let contentString = '<div id="dark-text"><p>Section ' + (i + 1) + '</p></div>'
					const infowindow = new google.maps.InfoWindow({
						content: contentString,
					});
					let marker = new google.maps.Marker({
						position: selectedPath[i].first,
						icon: {
							path: google.maps.SymbolPath.CIRCLE,
							fillColor: 'white',
							fillOpacity: 1,
							scale: 3,
							strokeColor: 'black',
							strokeWeight: 1,
							strokeOpacity: 1,
							// anchor: new google.maps.Point(200, 200)
						},
						//title: "#" + sections.length,
						map: map,
					});
					marker.addListener("click", () => {
						infowindow.open(map, marker);
					});
					contentString = '<div id="dark-text"><p>Last Point on Transect</p></div>'
					const infowindow2 = new google.maps.InfoWindow({
						content: contentString,
					});
					let lastMarker = new google.maps.Marker({
						position: selectedPath[selectedPath.length - 1].last,
						icon: {
							path: google.maps.SymbolPath.CIRCLE,
							fillColor: 'white',
							fillOpacity: 1,
							scale: 3,
							strokeColor: 'black',
							strokeWeight: 1,
							strokeOpacity: 1,
							// anchor: new google.maps.Point(200, 200)
						},
						//title: "#" + sections.length,
						map: map,
					});
					lastMarker.addListener("click", () => {
						infowindow2.open(map, lastMarker);
					});
					//pathlist.push(selectedPath[i].first);
					//pathlist.push(selectedPath[i].last)
				}
				//let pathlist = [selectedPath[0].first, selectedPath[0].last];
				let arr1:any[] = []
				for(let i=0;i<pathlist.length;i++){
					for(let j=0;j<pathlist[i].length;j++){
						arr1.push(pathlist[i][j])
						if(j>=1 && j<pathlist[i].length-1){
							let marker = new google.maps.Marker({
								position: pathlist[i][j],
								icon: {
									path: google.maps.SymbolPath.CIRCLE,
									fillColor: 'black',
									fillOpacity: 1,
									scale: 3,
									strokeColor: 'black',
									strokeWeight: 1,
									strokeOpacity: 1,
									// anchor: new google.maps.Point(200, 200)
								},
								//title: "#" + sections.length,
								map: map,
							});
						}

					}
									
				}
				poly = new google.maps.Polyline({
					path: arr1,
					strokeColor: "#000000",
					strokeOpacity: 1.0,
					strokeWeight: 3
				});
				poly.setMap(map);
				
				//poly.setMap(map);
				console.log(pathlist)
				const buttonsDiv = document.createElement("div");
				buttonsDiv.id = "buttonsDiv";
				buttonsControl(buttonsDiv, map);
				map.controls[google.maps.ControlPosition.TOP_CENTER].push(buttonsDiv);
				// Add a listener for the click event //new (TestConstructorFunction as any)(1, 2);
				oSnap.init(map, poly);
				if(values.length==0){
					initLiveLocation();
				}
				//remove an edge of the transect when setting up
			}});
	});

	var oSnap = new (cSnapToRoute as any);

	if (redirectRecords == true) {
		return <Redirect to='/start/records'/>
	}
	if (home == true) {
		return <Redirect to='/' />
	}

	if (enterRecord) {
		let route = '/start/recordform'
		return <Redirect to={route} />

	}
	const record = () => {
		dispatch(photosPresent(photos.length))
		setRedirectRecords(true)
	}
	const picha = () => {
		takePhoto()
	}
	const take = async () => {
		dispatch(photosPresent(photos.length))
		let s = await picha()
		if (photos.length == 0) {
			dispatch(setFalse())
		}
		console.log(props.memoryFull)
		if (props.memoryFull == true) {
			setMemoryAlert(true)
		} else {
			setEnterRecord(true)

		}

	}

	//button controls added on top of map
	const buttonsControl = (div: Element, map: google.maps.Map) => {
		//the buttons to be included on the map
		const photoButton = document.createElement("a");
		photoButton.innerHTML = "Home";
		photoButton.className = "map-buttons";
		photoButton.style.margin = "0 2% 0 0";

		const withoutButton = document.createElement("a");
		withoutButton.id = "without"
		withoutButton.innerHTML = "Record Observation";
		withoutButton.className = "map-buttons";
		withoutButton.style.margin = "10% 0";

		const recordsButton = document.createElement("button");
		recordsButton.innerHTML = "View Records entered";
		recordsButton.className = "map-buttons";
		recordsButton.style.margin = "12% 2% 0 0";

		const backButton = document.createElement("a");
		backButton.innerHTML = "BACK ";
		backButton.style.padding = "20% 20px";
		backButton.style.margin = "10% 0";
		backButton.style.backgroundColor = "white";
		backButton.style.color = "black";
		backButton.style.fontWeight = "bold";


		//div.appendChild(photoButton);
		//photoButton.href="/"
		//photoButton.addEventListener("click",take)
		if(values.length==0){
			div.appendChild(withoutButton);
			div.appendChild(recordsButton);
			withoutButton.addEventListener("click", sendSectionNumber)
			recordsButton.addEventListener("click", record)
		}else{
			div.appendChild(backButton);
			backButton.href="/mysites"
			
		}
	}
	const sendSectionNumber = () => {
		console.log("Here")

		let sectionNumber: number | any
		for (let i = 0; i < selectedPath.length; i++) {	
			let arr = []		
			arr.push(selectedPath[i].first)
			arr.push(selectedPath[i].last)
			let polytest = new google.maps.Polygon({
				paths: pathlist[i],
			});
			console.log(i, arr)
			if (google.maps.geometry.poly.containsLocation(oSnap.getClosestLatLng(liveposition), polytest)) {
				console.log("adding to i")
				//console.log(oSnap.getClosestLatLng(e.latLng));
				console.log("In Section", i + 1);
				sectionNumber = i + 1
			}
		}
		
		console.log("Section number is", sectionNumber);
		let temp = new Temps(sectionNumber, false, false);
		dispatch(changeTemp(temp));
		setEnterRecord(true)

		//check if near transect --not sure if necessary
		/*
		if (google.maps.geometry.poly.isLocationOnEdge(initialLocation, poly, 10e-3)) {
		  console.log(oSnap.getClosestLatLng(initialLocation))
		  console.log("Here");
		}else{
		  console.log("Not here");
		}*/
		//});

		// } 
	}
	let map: google.maps.Map;
	let poly: google.maps.Polyline;
	let markerLivePos: google.maps.Marker;


	//get Live location of user
	let liveLocation = null;
	let liveposition: google.maps.LatLng | google.maps.LatLngLiteral | null | any;
	const options = {
		enableHighAccuracy: true
	};
	//first add current location of user to the polyline then add the prograssive ones 
	const trackUser = (position: { coords: { latitude: any; longitude: any; }; }) => {
		//console.log(position.coords.latitude);
		liveposition = new google.maps.LatLng({ lat: position.coords.latitude, lng: position.coords.longitude });
		//addLatLng(liveposition);
		if(values.length==0){
			markerLivePos.setPosition(liveposition);
		}
		
	};

	const catchErrors = (e: any) => {
		setFindLive(true);
	};
	//get live location everytime
	const initLiveLocation = () => {
		//remove any markers present in the ap showing the location        
		liveLocation = navigator.geolocation.watchPosition(trackUser, catchErrors, options);
	}

	return (
		<><IonRouterOutlet>
			<Route path="/sectiondetails" component={SectionDetails} />

		</IonRouterOutlet>
			<IonPage >
				<IonContent fullscreen className="content">
					<div id="map" className="transectmap">

						<IonAlert
							isOpen={showScrollToPos}
							onDidDismiss={() => setScrollToPos(false)}
							cssClass='submitalert'
							header={'Map cannot spot where you are'}
							message={'Scroll to where you are'}
							buttons={[
								{
									text: 'OK',

								}
							]} />
						<IonAlert
							isOpen={findLive}
							onDidDismiss={() => setFindLive(false)}
							cssClass='submitalert'
							header={'Live Location'}
							message={'Problem finding live location. Try again or set it up manually'}
							buttons={[
								{
									text: 'OK',

								},
								{
									text: 'Set Manually',

								}
							]} />

						<IonAlert
							isOpen={memoryAlert}
							onDidDismiss={() => setMemoryAlert(false)}
							cssClass='submitalert'
							header={'Memory Full'}
							message={'Photos cannot be taken with full memory'}
							buttons={[
								{
									text: 'OK'
								},

								{
									text: 'Cancel',
									role: 'cancel'
								}
							]} />

					</div>
				</IonContent>
			</IonPage></>

	);
};
const mapStateToProps = function (state: any) {
	return {
		records: state.records,
		walk: state.walk,
		memoryFull: state.memoryFull,
		transects: state.transects
	}
}
export default connect(mapStateToProps)(Map);
