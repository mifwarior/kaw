import Constants from "./../constants"

const AddItemReducer = (state = [], action)=>{

  if(action.type === Constants.ADD_ITEM){
    return [
      ...state,
      action.payload
    ]
  }

  return state;
}

export default AddItemReducer;