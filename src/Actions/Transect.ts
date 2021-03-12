import { RouteStart, Transect } from "../Reducers/TransectReducer"
import {Section} from '../Reducers/SectionsReducer';
// Create Redux action types
export const SET_ROUTESTART = 'SET_ROUTESTART'
export const RESET_ROUTESTART = 'RESET_ROUTESTART'
export const SET_SECTIONS = 'SET_SECTIONS';
export const RESET_SECTIONS = 'RESET_SECTIONS'
export const ADD_TRANSECT = 'ADD_TRANSECT';
export const RESET_TRANSECTS= 'RESET_TRANSECTS';
//export const RESET_RECORDS = 'RESET_RECORDS'
// Create Redux action creators that return an action
export const setRouteStart = (routeStart: RouteStart) => ({
    type: SET_ROUTESTART,
    payload: routeStart,
  })

export const resetRouteStart = () => ({
    type: RESET_ROUTESTART,
})


//sections
export const setSections = (sectionslist: Section[])=>({
  type: SET_SECTIONS,
  payload: sectionslist,
})

export const resetSections = () => ({
  type: RESET_SECTIONS,
})

//transects - finished set up
export const addTransect =(transect: Transect)=>({
  type: ADD_TRANSECT,
  payload: transect,
})

export const resetTransects = () => ({
  type: RESET_TRANSECTS,
})




