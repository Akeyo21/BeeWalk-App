//import { BeeSpecies } from "../Reducers/SpeciesReducer"

import { Temps } from "../Reducers/temps"

// Create Redux action types
export const CHANGE_TEMP = 'CHANGE_TEMP'
// Create Redux action creators that return an action
export const changeTemp = (sectionNumber:Temps) => ({
    type: CHANGE_TEMP,
    payload: sectionNumber,
  })

/*
  export function selectedSpecies(species){
      dispatch(selectBeeSpecies(species))
  }*/