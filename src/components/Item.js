import React from 'react'
import propTypes from 'prop-types'

const Item = ({name, level, cost, materials, properties}) =>{
  return (
    <div>
      <input className="itemName" defaultValue={name}/>
      <div>
        <span>Ур.</span>
        <input defaultValue={level}/>
      </div>
      <div>
        <span>Серебро</span>
        <input defaultValue={cost}/>
      </div>
      
      <div style={{display: "inline-block"}}>
        <span>Материалы</span>
        <div>
          <Selector onSelect={console.log}>
            <Select {...{
              selectedIndex:0,
              onSelect:console.log,
              array:["one","two"]
            }}/>
          </Selector>
        </div>

      </div>
      <div>
        <span>properties</span>
        <input list="browsers" onChange={({target})=>console.dir(target)}/>
      </div>
      <datalist id="browsers">
        <option value="Internet Explorer">asdf</option>
        <option value="Internet Explorer2">asdf2</option>
      </datalist>
    </div>
  )
}

Item.propTypes = {
  name: propTypes.string.isRequired
}

export default Item;
