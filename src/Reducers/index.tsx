import {combineReducers} from 'redux'

//import postsReducer from './postsReducer'
import speciesReducer from './SpeciesReducer'
import recordsReducer from './RecordsReducer'
import photosReducer from './PhotosReducer'
import walksBeforeReducer from './WalksBeforeReducer'
import walksReducer from './WalksReducer'
import memoryFull from './MemoryReducer'
import routeStartReducer from './RouteStartReducer'
export const rootReducer = combineReducers({
  species: speciesReducer,
  records: recordsReducer,
  photos: photosReducer, 
  walk: walksBeforeReducer,
  walks: walksReducer,
  memoryFull: memoryFull,
  routeStart: routeStartReducer,
})

export default rootReducer
export type RootState = ReturnType<typeof rootReducer>