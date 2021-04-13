//import { BeeSpecies } from "../Reducers/SpeciesReducer"

// Create Redux action types
export const CHANGE_SECTION = 'CHANGE_SECTION'

// Create Redux action creators that return an action
export const changeSection = (sectionNumber:number) => ({
    type: CHANGE_SECTION,
    payload: sectionNumber,
  })

/*
  export function selectedSpecies(species){
      dispatch(selectBeeSpecies(species))
  }*/