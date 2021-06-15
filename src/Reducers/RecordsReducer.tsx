// Import all actions
import { AnyAction } from 'redux';
import * as actions from '../Actions/Records'
import { Photo } from '../pages/Camera';
import { BeeSpecies } from './SpeciesReducer';
import {removeItemOnce} from './WalksReducer';
export class Record{
    section: number;
    species: BeeSpecies;
    flower:string|null;
    photos: Photo[];
    constructor(section:number, species: BeeSpecies, flower:string|null, photos:Photo[]){
        this.section = section;
        this.species = species;
        this.flower = flower;
        this.photos = photos;
    }

    getPhotos(){
        return this.photos;
    }

    getSection(){
        return this.section;
    }

    getSpecies(){
        return this.species;
    }
    getFlower(){
        return this.flower;
    }
}

export const initialState = {
    records:[] 
  }
  
export default function recordsReducer(state = initialState, action: AnyAction) {
    switch (action.type) {
        case actions.ADD_RECORD:
            return {...state, records: state.records.concat(action.payload)}
        case actions.RESET_RECORDS:
            return {...state, records:action.payload}
        case actions.DELETE_RECORD:
            return {...state, records:removeItemOnce(state.records, action.payload)}
        case actions.UPDATE_RECORDS:
            return {...state, records:action.payload}
      
      default:
        return state
    }
  }