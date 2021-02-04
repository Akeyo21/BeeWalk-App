import {combineReducers} from 'redux'

//import postsReducer from './postsReducer'
import speciesReducer from './SpeciesReducer'
import recordsReducer from './RecordsReducer'
import photosReducer from './PhotosReducer'

const rootReducer = combineReducers({
  species: speciesReducer,
  records: recordsReducer,
  photos: photosReducer
})

export default rootReducer