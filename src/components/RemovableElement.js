import React from 'react'
import propTypes from 'prop-types'

class RemovableElement extends React.Component {
   
  constructor(props){
    super(props);
    this.child = React.createRef();
  }
    render (){
      const {children, onRemove} = this.props;
      return (
        <div>
          {children}
          <button onClick={onRemove}>x</button>
        </div>
      )
    }
      
}

RemovableElement.propTypes = {
  children: propTypes.object.isRequired
}


export default RemovableElement;
