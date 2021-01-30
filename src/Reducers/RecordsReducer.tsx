// Import all actions
import { threadId } from 'worker_threads';
import * as actions from '../Actions/Records'
import { Photo } from '../pages/Camera';
import { BeeSpecies } from './SpeciesReducer';
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
  
export default function recordsReducer(state = initialState, action: { type: any; payload: any; }) {
    switch (action.type) {
        case actions.ADD_RECORD:
            return {...state, records: state.records.concat(action.payload)}
      default:
        return state
    }
  }