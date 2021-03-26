import { Walk } from "../Reducers/WalksBeforeReducer"
import {UpdatedWalk} from '../Reducers/WalksReducer'
// Create Redux action types
export const SET_WALK = 'SET_WALK'
export const RESET_WALK = 'RESET_WALK'
export const ADD_WALK = 'ADD_WALK'
export const RESET_WALKS = 'RESET_WALKS'
export const DELETE_WALK = 'DELETE_WALK';
//export const RESET_RECORDS = 'RESET_RECORDS'
// Create Redux action creators that return an action
export const setWalk = (walk: Walk) => ({
    type: SET_WALK,
    payload: walk,
  })

  export const resetWalk = () => ({
    type: RESET_WALK,
  })

export const addWalk=(walk:UpdatedWalk)=>({
    type:ADD_WALK,
    payload:walk,
})

export const resetWalks = () => ({
    type: RESET_WALKS,
  })

  

  export const deleteWalk=(index)=>({
    type:DELETE_WALK,
    payload:index
  })
