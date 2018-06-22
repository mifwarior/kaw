import React from 'react'
import propTypes from 'prop-types'

const FileInput = ({onOpen})=>{

  return (
    <input className="fileInput" type="file" onChange={({target})=>onOpen(target.files[0])}/>
  )
}

FileInput.propTypes = {
  onOpen: propTypes.func.isRequired
}

export default FileInput;
