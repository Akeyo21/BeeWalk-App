
import { AnyAction } from 'redux';
import * as actions from '../Actions/RouteStart'
export class Section{
    length: number;
    gridref: string;
    habitat: string[];
    landuse:string[];
    positions:Object[];
    constructor(length:number, gridref:string, habitat:string[], landuse:string[],positions:Object[] ){
        this.length=length;
        this.gridref = gridref;
        this.habitat = habitat;
        this.landuse = landuse;
        this.positions = positions;
    }

    getPositions(){
        return this.positions;
    }
}
export class RouteStart{
    name: string;
    gridRef: string;
    county: string;
    year: number;
    constructor(name:string, gridRef:string, county:string, year:number){
        this.name = name;
        this.gridRef = gridRef;
        this.county = county;
        this.year = year;
    }
}
export const initialState = {
    routeStart:null
  }
  
export default function photosReducer(state = initialState, action: AnyAction) {
    switch (action.type) {
        case actions.SET_ROUTESTART:
            return {...state, routeStart:action.payload}
        case actions.RESET_ROUTESTART:
            return {...state, routeStart: initialState}
      default:
        return state
    }
  }