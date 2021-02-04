//import { Record } from "../Reducers/RecordsReducer"
import { Photo } from '../pages/Camera';

// Create Redux action types
export const PHOTOS_PRESENT = 'PHOTOS_PRESENT'
export const RESET_PHOTOS = 'RESET_PHOTOS'
// Create Redux action creators that return an action
export const photosPresent = (photoslength: number) => ({
    type: PHOTOS_PRESENT,
   payload: photoslength
  })

export const resetPhotos=()=>({
    type: RESET_PHOTOS,
})

/*
  export function selectedSpecies(species){
      dispatch(selectBeeSpecies(species))
  }*/