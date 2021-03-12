import { AnyAction } from 'redux';
import * as actions from '../Actions/Transect'

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

    setHabitat(habitat:string[]){
        this.habitat = habitat;
    }

    setLandUse(landuses:string[]){
        this.landuse = landuses;
    }
}
export const initialState={
    sections:null
}

export default function sectionReducer(state = initialState, action: AnyAction) {
    switch (action.type) {
        case actions.SET_SECTIONS:
            return {...state, sections: action.payload}
        case actions.RESET_ROUTESTART:
            return {...state, sections: initialState}
      default:
        return state
    }
  }