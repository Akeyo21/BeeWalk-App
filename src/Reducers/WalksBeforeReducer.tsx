import { AnyAction } from "redux";

import * as actions from '../Actions/Walks'
export class Walk{
    recorder: string; //name of recorder
    transect: string; //transect being walked
    date: string;
    startTime: string;
    temp:number;
    sunshine:string;
    windSpeed: string;
    constructor(recorder: string, //name of recorder
        transect: string, //transect being walked
        date: string,
        startTime: string,
        temp:number,
        sunshine:string,
        windSpeed: string){
            this.recorder = recorder;
            this.transect = transect;
            this.date = date;
            this.startTime = startTime;
            this.temp = temp;
            this.sunshine = sunshine;
            this.windSpeed = windSpeed;
    }

    getTemp(){
        return this.temp;
    }
}

export const initialState = {
    walk:null,
  }
  
export default function walksBeforeReducer(state = initialState, action: AnyAction) {
    switch (action.type) {
        case actions.SET_WALK:
            return {...state, walk: action.payload}
        case actions.RESET_WALK:
            return {...state, walk:initialState}
      default:
        return state
    }
  }