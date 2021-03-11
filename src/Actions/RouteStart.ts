import { RouteStart } from "../Reducers/RouteStartReducer"
// Create Redux action types
export const SET_ROUTESTART = 'SET_ROUTESTART'
export const RESET_ROUTESTART = 'RESET_ROUTESTART'

//export const RESET_RECORDS = 'RESET_RECORDS'
// Create Redux action creators that return an action
export const setRouteStart = (routeStart: RouteStart) => ({
    type: SET_ROUTESTART,
    payload: routeStart,
  })

  export const resetRouteStart = () => ({
    type: RESET_ROUTESTART,
  })


