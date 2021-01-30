import { Record } from "../Reducers/RecordsReducer"

// Create Redux action types
export const ADD_RECORD = 'ADD_RECORD'

// Create Redux action creators that return an action
export const addRecord = (record: Record) => ({
    type: ADD_RECORD,
    payload: record,
  })

/*
  export function selectedSpecies(species){
      dispatch(selectBeeSpecies(species))
  }*/