import React from 'react'
import propTypes from 'prop-types'
import {connect} from 'react-redux'
import FileInput from './../components/FileInput'
import {loadLocalFile} from './../actions'

const mapStateToProps = (state, ownProps)=>{
  return state
}

const mapDispatchToProps = (dispatch, ownProps) =>{
  return {
    onOpen:(obj)=>{
      dispatch(loadLocalFile(obj))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FileInput);

