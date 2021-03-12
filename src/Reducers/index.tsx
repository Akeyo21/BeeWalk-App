import {combineReducers} from 'redux'

//import postsReducer from './postsReducer'
import speciesReducer from './SpeciesReducer'
import recordsReducer from './RecordsReducer'
import photosReducer from './PhotosReducer'
import walksBeforeReducer from './WalksBeforeReducer'
import walksReducer from './WalksReducer'
import memoryFull from './MemoryReducer'
import routeStartReducer, { transectReducer } from './TransectReducer'
import sectionReducer from './SectionsReducer';
export const rootReducer = combineReducers({
  species: speciesReducer,
  records: recordsReducer,
  photos: photosReducer, 
  walk: walksBeforeReducer,
  walks: walksReducer,
  memoryFull: memoryFull,
  routeStart: routeStartReducer,
  sections: sectionReducer,
  transects: transectReducer,
})

export default rootReducer
export type RootState = ReturnType<typeof rootReducer>