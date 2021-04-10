import { useState, useEffect } from "react";
import { useCamera } from '@ionic/react-hooks/camera';
import { useFilesystem, base64FromPath } from '@ionic/react-hooks/filesystem';
import { useStorage } from '@ionic/react-hooks/storage';
import { isPlatform } from '@ionic/react';
import { CameraResultType, CameraSource, CameraPhoto, Capacitor, FilesystemDirectory, Camera } from "@capacitor/core";
import { useDispatch, useSelector } from "react-redux";
import { setTrue } from "../Actions/MemoryFull";
import { RootState } from "../Reducers";
export interface Photo {
  filepath: string;
  webviewPath?: string;
  filename: string;
}
const PHOTO_STORAGE = "photos";
/*export function clearPhotos(){
  const { get, set } = useStorage();
const clear=async ()=>{
  const photosString = await set('photos', clear());
}
}*/
export function promiseState(promise: any, callback: (arg0: string) => any) {
  // Symbols and RegExps are never content-equal
  var uniqueValue = window['Symbol'] ? Symbol('unique') : /unique/

  function notifyPendingOrResolved(value: symbol | RegExp) {
    if (value === uniqueValue) {
      return callback('pending')
    } else {
      return callback('fulfilled')
    }
  }

  function notifyRejected(reason: any) {
    return callback('rejected')
  }
  
  var race = [promise, Promise.resolve(uniqueValue)]
  Promise.race(race).then(notifyPendingOrResolved, notifyRejected)
}

export function usePhotoGallery() {
  const { deleteFile, getUri, readFile, writeFile } = useFilesystem();
  const { get, set } = useStorage();
    const { getPhoto } = useCamera();
    const dispatch = useDispatch()
    const memoryFull = useSelector((state:RootState) => state.memoryFull)
    
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [newPhotosTaken, setNewPhotos] = useState<Photo[]>([])
    const savePicture = async (photo: CameraPhoto, fileName: string): Promise<Photo> => {
      let base64Data: string;
      // "hybrid" will detect Cordova or Capacitor;
      if (isPlatform('hybrid')) {
        const file = await readFile({
          path: photo.path!
        });
        base64Data = file.data;
      } else {
        base64Data = await base64FromPath(photo.webPath!);
      }
      const savedFile = await writeFile({
        path: fileName,
        data: base64Data,
        directory: FilesystemDirectory.Data
      });
    
      if (isPlatform('hybrid')) {
        return {
          filepath: savedFile.uri,
          webviewPath: Capacitor.convertFileSrc(savedFile.uri),
          filename: fileName
        };
      }
      else {
        // Use webPath to display the new image instead of base64 since it's
        // already loaded into memory
        return {
          filepath: fileName,
          webviewPath: photo.webPath,
          filename: fileName
        };
      }
    };
    useEffect(() => {
      const loadSaved = async () => {
        const photosString = await get('photos');
        const photosInStorage = (photosString ? JSON.parse(photosString) : []) as Photo[];
        // If running on the web...
        if (!isPlatform('hybrid')) {
          for (let photo of photosInStorage) {
            const file = await readFile({
              path: photo.filepath,
              directory: FilesystemDirectory.Data
            });
            // Web platform only: Load photo as base64 data
            photo.webviewPath = `data:image/jpeg;base64,${file.data}`;
          }
        }
        //empty photos
        //setPhotos([]);
        setPhotos(photosInStorage);
      };
      loadSaved();
    }, [get, readFile]);
    const takePhoto = async () => {
      let memory = Object.values(memoryFull)
      let check = Boolean(memory[0])
      if(check==false){
        console.log("here")
      const cameraPhoto = await getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        quality: 100
      });
      const fileName = new Date().getTime() + '.jpeg';
      const savedFileImage = await savePicture(cameraPhoto, fileName);
      setNewPhotos([savedFileImage, ...newPhotosTaken])
      const newPhotos = [...photos, savedFileImage, ];
      setPhotos(newPhotos);
      
      console.log("trying")
      let x:Promise<void>
      x = set(PHOTO_STORAGE, JSON.stringify(newPhotos));

      if(!x){
        console.log("hello")
        throw("Exception")
      }else{
        promiseState(x, function(state) {
          
          if(state=='rejected'){
            dispatch(setTrue(true))
            //console.log("reject")
            //throw("Exception: Memory")
          }
          })
          
      
    
        console.log( x)
        console.log(Object.values(x))
      }
    }else{
      const cameraPhoto = []
    }
    
      
      /*const newPhotos = [{
        filepath: fileName,
        webviewPath: cameraPhoto.webPath
      }, ...photos];
      const newPhotos = [{
        filepath: fileName,
        webviewPath: cameraPhoto.webPath
      }, ...photos];
      setPhotos(newPhotos)*/
      
      
      
    };
    const clearPhotos=()=>{
      setPhotos([])
    }
  
    return {
      photos,
      newPhotosTaken,
      clearPhotos, 
      takePhoto
    };

    
  }
  export const resetPhotos=()=>{

  }