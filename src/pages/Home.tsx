import { IonContent, IonHeader, IonPage, IonButton, IonRouterOutlet , IonTabs, IonTabBar,IonTabButton,
IonIcon, IonLabel, IonBadge, IonSlides, IonSlide, IonText, IonFooter, useIonAlert} from '@ionic/react';
import { calendar, personCircle, map, informationCircle, ellipsisHorizontal, home, leaf, navigate, walk } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
/*import './Home.css';*/
import '../components/ExploreContainer.css';
import '../components/LoginPage.css';
import { connect, useDispatch } from 'react-redux';
import { resetWalks } from '../Actions/Walks';
import Tabs from '../components/Tabs';
import { Temps } from '../Reducers/temps';
import { changeTemp } from '../Actions/temps';
import { Redirect } from 'react-router';

/**/
interface ContainerProps {
  temporary:number|any,
  walking:boolean|any
}
const Home: React.FC<ContainerProps> = (props) => {
//const Postlogin: React.FC = () => {
  //const reader = new FileReader();
  console.log(props.walking.walking)
  let dispatch = useDispatch();
const [present] = useIonAlert();
const [canWalk, setStartWalk] = useState(false)
const showInfo=(info:string, heading:string)=>{
  present({
    cssClass: 'my-css',
    header: heading,
    message: info,
    buttons: [        
      'Ok',      
    ],
    onDidDismiss: (e) => console.log(e) ,
  })
}

const resetTemps=()=>{
  let temporary= new Temps(0, false, false);
  dispatch(changeTemp(temporary));
}

if(props.temporary.temps){
  if(props.temporary.temps.newWalk){
    showInfo('The completed walk has been added to My Walks Page', 'New Walk')
    resetTemps()
  }
 
  if(props.temporary.temps.newTransect){
    showInfo('The entered transect has been added to My Sites Page', 'New Transect')
    resetTemps()
  }
}
  
  let filepath:any = './bumblebee.jpg';
  let file = 'bumblebee.jpg';
  /*reader.addEventListener("load", function () {
    // convert image file to base64 string
    filepath= reader.result;
  }, false);
  //var reader = new FileReader();
  reader.onloadend = function() {
    filepath= reader.result;
    console.log('RESULT', reader.result)
  }
  let blob;
  if(file){
    blob= reader.readAsDataURL(filepath);
  }else{
    console.log("error")
  }*/
  function toDataURL(url: string, callback: { (dataUrl: any): void; (arg0: string | ArrayBuffer | null): void; }) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
      var reader = new FileReader();
      reader.onloadend = function() {
        callback(reader.result);
      }
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }
  let blob;
  /*toDataURL(filepath, function(dataUrl: any) {
    
  let data ={'image1': file}
    fetch('http://3.249.81.168/api/image',{
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'no-cors',
    body: JSON.stringify(data)
  })   
  .then(response => response.text())
  .then(data => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
    console.log('RESULT:', dataUrl)
  })
  console.log(blob);*/
  
  
  let data ={'image1': [file, filepath]}
  /*useEffect(()=>{
  fetch('http://3.249.81.168/api/image',{
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'no-cors',
    body: JSON.stringify(data)
  })   
  .then(response => console.log(response.text()))
  .then(data => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
  })*/
  

 console.log("Home");
 const finishWalkPrompt=()=>{
   console.log(props.walking.walking)
   if(props.walking.walking){
    showInfo('Save records in current walk to start a new walk', 'Current Walk')
   }else{
     setStartWalk(true)
   }
 }
 if(canWalk){
  return <Redirect to="/start/prewalk"/>
 }
  return (
    
    <><>
     </>
        <IonContent fullscreen>
          
          
          <div className="container">
            
              <div className="wholepage" >   
                <div id="move">
                
                    <IonButton onClick={()=>finishWalkPrompt()}
                    color="warning" size="large" className="buttons" shape="round" expand="block">
                        Start Walk
                    </IonButton>

                    {props.walking.walking? <IonButton href="/mapwalk"
                    color="warning" size="large" className="buttons" shape="round" expand="block">
                        Resume Walk
                    </IonButton>:<IonText></IonText>}
                    

                    <IonButton routerLink="/commonbees"
                    color="warning" size="large" className="buttons" shape="round" expand="block">
                        Bees in my area
                    </IonButton>

                    
         
                </div>
                
                <Tabs/>
              </div>
          </div>
         
        </IonContent></>
  );
};
const mapStateToProps = function(state: any) {
  return {
    temporary: state.temps,
    walking: state.walking
  }
}

export default connect(mapStateToProps)(Home);/*
export default Postlogin;*/
