import {combineReducers} from 'redux'

//import postsReducer from './postsReducer'
import speciesReducer from './SpeciesReducer'
const rootReducer = combineReducers({
  //posts: postsReducer,
  species: speciesReducer,
})

export default rootReducer