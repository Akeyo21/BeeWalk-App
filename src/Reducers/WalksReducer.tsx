import { AnyAction } from "redux";
import { Walk } from "./WalksBeforeReducer"
import * as actions from '../Actions/Walks'

export class UpdatedWalk extends Walk{
    endTime:string;
    records: [];
    constructor(recorder:string, transect:number, date:string, 
        startTime:string, temp:number, sunshine:string, windSpeed:string, endTime:string, records:[]){
        super(recorder, transect, date, startTime, temp,sunshine,windSpeed);
        this.endTime = endTime;
        this.records = records
        
    }
}

export const initialState = {
    walks:[],
  }
  
  function removeItemOnce(arr: any[], index: number) {
    //var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }
export default function walksReducer(state = initialState, action: AnyAction) {
    switch (action.type) {
        case actions.ADD_WALK:
            return {...state, walks: state.walks.concat(action.payload)}
        case actions.RESET_WALKS:
            return {...state, walks: []}
        case actions.DELETE_WALK:
            return {...state, walks: removeItemOnce(state.walks, action.payload)}
      default:
        return state
    }
  }