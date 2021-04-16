// Import all actions
import { AnyAction } from 'redux';
import * as actions from '../Actions/temps'
export class Temps{
    sectionNumber:number;
    newTransect:boolean;
    newWalk:boolean;
    //caste:any[]
    constructor(sectionNumber:number, newTransect:boolean, newWalk:boolean){
        this.sectionNumber = sectionNumber;
        this.newTransect = newTransect;
        this.newWalk = newWalk;
        //this.caste = caste;
    }

    getSectionNumber(){
        return this.sectionNumber;
    }

   
}

export const initialState = {
    temps: null
  }
  
export default function speciesReducer(state = initialState, action: AnyAction) {
    switch (action.type) {
        case actions.CHANGE_TEMP:
            return {...state, temps: action.payload}
      default:
        return state
    }
  }