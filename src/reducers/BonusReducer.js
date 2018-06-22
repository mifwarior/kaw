import Constants from './../constants'
const bonusReducer = (state = [], action )=>{
  if(action.type === Constants.GET_DATA_SUCCESS){
    return action.payload.bonuses;
  }
  return state;
}

export default bonusReducer;