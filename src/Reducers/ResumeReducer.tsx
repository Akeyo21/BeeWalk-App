
import { AnyAction } from 'redux';
import * as actions from '../Actions/Resume'

export const initialState = {
    walking:false
}
export function resumeWalkReducer(state = initialState, action: AnyAction) {
    switch (action.type) {
        case actions.START_WALK:
            return {...state, walking:true}
        case actions.FINISH_WALK:
            return {...state, walking: false}
      default:
        return state
    }
}
