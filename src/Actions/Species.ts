import { BeeSpecies } from "../Reducers/SpeciesReducer"

// Create Redux action types
export const SELECT_BEE_SPECIES = 'SELECT_BEE_SPECIES'
export const SEND_BEE_SPECIES = 'SEND_BEE_SPECIES'

// Create Redux action creators that return an action
export const selectBeeSpecies = (speciesname: BeeSpecies|null) => ({
    type: SELECT_BEE_SPECIES,
    payload: speciesname,
  })

export const sendBeeSpecies = ()=>({
    type: SEND_BEE_SPECIES,
})
/*
  export function selectedSpecies(species){
      dispatch(selectBeeSpecies(species))
  }*/