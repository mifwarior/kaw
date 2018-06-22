import Constants from './../constants'
const bonusReducer = (state = [], action )=>{
  if(action.type === Constants.GET_DATA_SUCCESS){
    return action.payload.bonus;
  }
  return state;
}

export default bonusReducer;