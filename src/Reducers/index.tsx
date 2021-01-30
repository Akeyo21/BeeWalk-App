import {combineReducers} from 'redux'

//import postsReducer from './postsReducer'
import speciesReducer from './SpeciesReducer'
import recordsReducer from './RecordsReducer'
const rootReducer = combineReducers({
  //posts: postsReducer,
  species: speciesReducer,
  records: recordsReducer,
})

export default rootReducer