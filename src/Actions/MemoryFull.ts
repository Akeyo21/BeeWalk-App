

// Create Redux action types
export const SET_TRUE = 'SET_TRUE'
export const SET_FALSE = 'SET_FALSE'
// Create Redux action creators that return an action
export const setTrue = (value:boolean) => ({
    type: SET_TRUE,
   payload: value
  })

export const setFalse=()=>({
    type: SET_FALSE,
})

/*
  export function selectedSpecies(species){
      dispatch(selectBeeSpecies(species))
  }*/