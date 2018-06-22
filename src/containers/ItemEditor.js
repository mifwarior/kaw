import ItemEditor from './../components/ItemEditor'
import {connect} from 'react-redux'
import {addItem} from './../actions'

const mapStateToProps = (state, props)=>{
  return state;
}

const mapDispatchToProps = (dispatch, props)=>{
  return {
    onAddItem:(item)=>dispatch(addItem(item))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemEditor);
