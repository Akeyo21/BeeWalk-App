import {combineReducers} from 'redux'

//import postsReducer from './postsReducer'
import speciesReducer from './SpeciesReducer'
import recordsReducer from './RecordsReducer'
import photosReducer from './PhotosReducer'
import walksBeforeReducer from './WalksBeforeReducer'
import walksReducer from './WalksReducer'
const rootReducer = combineReducers({
  species: speciesReducer,
  records: recordsReducer,
  photos: photosReducer, 
  walk: walksBeforeReducer,
  walks: walksReducer,
})

export default rootReducer