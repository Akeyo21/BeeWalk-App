
import { AnyAction } from 'redux';
import * as actions from '../Actions/Photos'
export const initialState = {
    photos: 0
  }
  
export default function photosReducer(state = initialState, action: AnyAction) {
    switch (action.type) {
        case actions.PHOTOS_PRESENT:
            return {...state, photos: action.payload}
        /*case actions.RESET_PHOTOS:
            return {...state, photos: initialState}*/
      default:
        return state
    }
  }