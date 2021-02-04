// Import all actions
import { AnyAction } from 'redux';
import * as actions from '../Actions/Species'
export class BeeSpecies{
    name:string;
    caste:[{}]
    /*
    caste:string;//consider making an enum
    no:number; //how many they are
    The list is meant to contain caste and number*/
    constructor(name:string, caste:[{}]){
        this.name = name;
        this.caste = caste;
    }

    getName(){
        return this.name;
    }

    getCaste(){
        return this.caste;
    }

    
}

export const initialState = {
    species: null
  }
  
export default function speciesReducer(state = initialState, action: AnyAction) {
    switch (action.type) {
        case actions.SELECT_BEE_SPECIES:
            return {...state, species: action.payload}
        case actions.SEND_BEE_SPECIES:
            return {...state}
      default:
        return state
    }
  }