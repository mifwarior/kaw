import React from 'react'
import propTypes from 'prop-types'
import Item from './Item'

const ItemList = ({items, bonuses}) =>{

  const imtemList = items.map((item, index)=>{
    return <Item key={index} item={item} bonuses={bonuses}/>
  });
  
  return (
    <div>
      <div>Список вещей:</div>
      
    </div>
  )
}

ItemList.propTypes = {
  items: propTypes.array.isRequired
}

export default ItemList;
