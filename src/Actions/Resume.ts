
// Create Redux action types
export const START_WALK = 'START_WALK'
export const FINISH_WALK = 'FINISH_WALK'


// Create Redux action creators that return an action
export const startWalk = () => ({
    type: START_WALK,
  })

export const finishWalk = ()=>({
  type: FINISH_WALK,
})




/*
  export function selectedSpecies(species){
      dispatch(selectBeeSpecies(species))
  }*/