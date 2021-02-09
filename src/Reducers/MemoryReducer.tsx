
import { AnyAction } from 'redux';
import * as actions from '../Actions/MemoryFull'
export const initialState = {
    memoryFull: false
  }
  
export default function photosReducer(state = initialState, action: AnyAction) {
    switch (action.type) {
        case actions.SET_TRUE:
            return {...state, memoryFull: true}
        case actions.SET_FALSE:
            return {...state, memoryFull: initialState}
      default:
        return state
    }
  }