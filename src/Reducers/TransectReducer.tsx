
import { AnyAction } from 'redux';
import * as actions from '../Actions/Transect'
import { Section } from './SectionsReducer';

//info collected of the transect in first few pages
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

export class Transect extends RouteStart{
    sectionsNumber:number;
    distance: number;
    sections:Section[];
    constructor(name:string, gridRef:string, county:string, year:number,sectionsNumber:number, 
        distance:number, sections:Section[] ){
        super(name, gridRef, county, year);
        this.sectionsNumber = sectionsNumber;
        this.distance = distance;
        this.sections = sections;
    }
}
export const initialState = {
    routeStart:null
  }

//details filled before adding section info
export default function routeStartReducer(state = initialState, action: AnyAction) {
    switch (action.type) {
        case actions.SET_ROUTESTART:
            return {...state, routeStart:action.payload}
        case actions.RESET_ROUTESTART:
            return {...state, routeStart: initialState}
      default:
        return state
    }
}

export const initialTransectState = {
    transects:[]
  }
export function transectReducer(state = initialTransectState, action: AnyAction) {
    switch (action.type) {
        case actions.ADD_TRANSECT:
            return {...state, transects:state.transects.concat(action.payload)}
        case actions.RESET_TRANSECTS:
            return {...state, transects: initialTransectState}
      default:
        return state
    }
}
