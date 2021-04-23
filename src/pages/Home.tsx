import { IonContent, IonHeader, IonPage, IonButton, IonRouterOutlet , IonTabs, IonTabBar,IonTabButton,
IonIcon, IonLabel, IonBadge, IonSlides, IonSlide, IonText, IonFooter, useIonAlert, IonImg} from '@ionic/react';
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
import CommonBees from '../components/CommonBees';
//import '../images/bee.jpg'
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
  var formdata = new FormData();
  /*fetch('../images/bee.jpg')
  .then(function(response) {
    return response.blob()
  })
  .then(async function(blob) {
    await blob.arrayBuffer().then((e)=>{
      fetch("http://54.171.168.100/api/image",{
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'no-cors',
      headers: { 'Content-Type':'application/json' },
      body:JSON.stringify({
        'image1': blob
      }),   
      redirect: 'follow'
    })   
      .then(response => {
        console.log("this is the response")
        console.log(response.text())
      })
      .then(result => {
        console.log("This is the result")
        console.log(result)
      })
      .catch(error => console.log('error', error));
    })
   
    
    
  });*/
 const fileinput: HTMLInputElement|any= document.getElementById('fileInput')
  //var file2 = fileInput.files[0];
  if(document.getElementById('fileInput')){
    
  fileinput.onchange = ()=>{
    const selectedFile = fileinput.files[0];
  console.log(selectedFile);
    formdata.append("image1", selectedFile)
    /*fetch("http://54.171.168.100/api/image",{
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'no-cors',
      headers: { 'Content-Type':'application/json' },
      body: formdata,   
      redirect: 'follow'
    })     
      .then(response => {
        console.log("this is the response")
        console.log(response.text())
      })
      .then(result => {
        console.log("This is the result")
        console.log(result)
      })
      .catch(error => console.log('error', error));*/
  }}
  
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
  function binEncode(data: string | any[]) {
    var binArray = ""
    var datEncode = "";

    for (let i=0; i < data.length; i++) {
        binArray+=data[i].charCodeAt(0).toString(2); 
    } 
    for (let j=0; j < binArray.length; j++) {
        var pad = padding_left(binArray[j], '0', 8);
        datEncode += pad + ' '; 
    }
    function padding_left(s: string | any, c: string | any[], n: number) { if (! s || ! c || s.length >= n) {
        return s;
    }
    var max = (n - s.length)/c.length;
    for (var i = 0; i < max; i++) {
        s = c + s; } return s;
    }
    return binArray;
}
  function getBase64Image(img:any) {
    var canvas = document.createElement("canvas");
    //canvas.width = img.width;
    //canvas.height = img.height;
    //var ctx = canvas.getContext("2d");
    //ctx?.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("../images/bee.jpg");
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  }  
  var canvas = document.createElement("canvas");
    //canvas.width = img.width;
    //canvas.height = img.height;
    //var ctx = canvas.getContext("2d");
    //ctx?.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("../images/bee.jpg");
  var base64 = getBase64Image(dataURL);
  //console.log(binEncode(base64))
  //let formdata = new FormData
    formdata.append("image1", binEncode(base64))
    //dict["image1"] = 
    fetch("http://54.171.168.100/api/image",{
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'no-cors',
      body: formdata,   
      headers: {
        "Accept": "application/json"
    },
      //dataType: "json",
      redirect: 'follow'
    })   
      .then(response => {
        console.log("this is the response")
        console.log(response.text())
      })
      .then(result => {
        console.log("This is the result")
        console.log(result)
      })
      .catch(error => console.log('error', error));
      //var data = new FormData();
//data.append("image1", fileInput.files[0], "[PROXY]");
 /*
var xhr = new XMLHttpRequest();
xhr.withCredentials = true;
xhr.addEventListener("readystatechange", function() {
  if(this.readyState === 4) {
    console.log(this.responseText);
  }
});
xhr.open("POST", "http://54.171.168.100/api/image");
//xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
xhr.send(formdata);*/
  const getImageFile =(e:any)=>{
    console.log(typeof e.target.files)
    let formdata = new FormData
    formdata.append("image1", e.target.files[0])
    /*for(var pair of formdata.entries()) {
      console.log("Inside method")
      console.log(pair[0]+', '+pair[1]);
    }*/
      
    fetch("http://54.171.168.100/api/image",{
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'no-cors',
      headers: {
        "Accept": "application/json"
    }
    })   
      .then(response => response.json())
      .then((result) => {
        console.log("This is the result")
        console.log(result)
      },
      (error) =>{
         console.log('error', error)});
  }

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
