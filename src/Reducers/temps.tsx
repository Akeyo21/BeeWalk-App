// Import all actions
import { AnyAction } from 'redux';
import * as actions from '../Actions/temps'
export class temps{
    sectionNumber:number;
    //caste:any[]
    constructor(sectionNumber:number){
        this.sectionNumber = sectionNumber;
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
        case actions.CHANGE_SECTION:
            return {...state, temps: action.payload}
      default:
        return state
    }
  }