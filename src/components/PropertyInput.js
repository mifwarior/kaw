import React from 'react'
import propTypes from 'prop-types'

class PropertyInput extends React.Component {
   
  constructor(props){
    super(props);
    this.select = React.createRef();
    this.input = React.createRef();
    this.onChangeInput = this.onChangeInput.bind(this);
    this.onChangeSelect = this.onChangeSelect.bind(this);
  }

  onChangeInput(ev){
    this.props.onChange(this.select.current.selectedIndex||0, Number(ev.target.value)||0);
  }
  onChangeSelect(ev){
    this.props.onChange(Number(ev.target.selectedIndex), Number(this.input.current.value));
  }

  render (){
      const {selections, selected, value} = this.props;

      const list = selections.map((selection, index)=>{
        return <option key={index} value={index}>{selection}</option>
      })

      return (
        <span>
          <select selected={selected||0} ref={this.select} onChange={this.onChangeSelect}>
            {list}
          </select>
          <input type="number" step="0.1" defaultValue={value} ref={this.input} onChange={this.onChangeInput}/>
        </span>
      )
    }
}

PropertyInput.propTypes = {
  selections: propTypes.array.isRequired,
  selected: propTypes.number.isRequired,
  value: propTypes.number.isRequired,
  onChange: propTypes.func.isRequired
}


export default PropertyInput;
