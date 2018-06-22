import React from 'react'
import propTypes from 'prop-types'

const Item = ({item}) =>{

  const {name, properties, materials} = item;

  const propertiesList = properties.map((property, index)=>{
    return (
      <div key={index}>
        <span>{property.type}:</span>
        <span>{property.value}%</span>
      </div>
    )
  });

  const materialsList = materials.map((material, index)=>{
    return (
      <div key={index}>
        <span>{material.type}:</span>
      </div>
    )
  });
  return (
    <div>
      <fieldset>
        <div>name</div>

        <div style={{display: "inline-block"}}>
          <span>Материалы:</span>
          <div>
            {propertiesList}
          </div>
        </div>

        <div style={{display: "inline-block"}}>
          <span>Бонусы:</span>
          <div>
            {materialsList}
          </div>
        </div>
      </fieldset>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired
}

export default Item;
