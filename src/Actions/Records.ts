import { Record } from "../Reducers/RecordsReducer"

// Create Redux action types
export const ADD_RECORD = 'ADD_RECORD'
export const RESET_RECORDS = 'RESET_RECORDS'
export const UPDATE_RECORDS = 'UPDATE_RECORDS'
export const DELETE_RECORD = 'DELETE_RECORD'
// Create Redux action creators that return an action
export const addRecord = (record: Record) => ({
    type: ADD_RECORD,
    payload: record,
  })

export const resetRecords = ()=>({
  type: RESET_RECORDS,
  payload: [] ,
})


export const updateRecords = (record:Record[])=>({
  type: UPDATE_RECORDS,
  payload: record,
})

export const deleteRecord = (index:number)=>({
  type: DELETE_RECORD,
  payload: index,
})




/*
  export function selectedSpecies(species){
      dispatch(selectBeeSpecies(species))
  }*/