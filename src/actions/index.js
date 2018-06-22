import Constants from "./../constants"
import fetch from 'isomorphic-fetch'
export function addItem(obj){
  return {
    type:Constants.ADD_ITEM,
    payload: obj
  }
}

export function getDataError(err){
  return {type:Constants.GET_DATA_FAILED, payload:err}
}

export function loadLocalFile(file){
  return (dispatch)=>{
    var fileReader = new FileReader();
    fileReader.onload = (e)=>{
      const json = e.target.result;
      let data = null;
      try{
        data = JSON.parse(json);
      }
      catch(err){
        dispatch(getDataError(err));
      }
      if(data) dispatch(getDataSuccess(data));
    };
    fileReader.onerror =(err)=>{
      dispatch(getDataError(err));
    }
    fileReader.readAsText(file);
  }
}

export function getDataSuccess(data){
  return {
    type:Constants.GET_DATA_SUCCESS,
     payload:data
    };
}

export function dataRequest(){
  return (dispatch)=>{
    const url = "/data.json"
    dispatch({type: Constants.GET_DATA_REQUEST});

    fetch(url).then((res)=> res.json()).then(
      data =>{
        dispatch(getDataSuccess(data));
      }
    ).catch((err)=>{
      dispatch(getDataError(err));
    })
  }
}