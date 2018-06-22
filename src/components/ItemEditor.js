import React from 'react'
import propTypes from 'prop-types'

import PropertyInput from './PropertyInput'
import RemovableElement from './RemovableElement'

class ItemEditor extends React.Component{

  constructor(props){
    super(props);
    this.name = "Name";
    this.properties = [];
    this.materials = [];
    this.addProperty = this.addProperty.bind(this);
    this.removeProperty = this.removeProperty.bind(this);
    this.propId = 0;
    
  }
  addProperty(){
    this.properties.push({
      id:this.propId,
      type:0,
      value:0
    }); 
    this.propId++;
    this.forceUpdate();
  }
  removeProperty(id){
    this.properties = this.properties.filter((property, index)=>{
      return property.id!==id;
    });
    this.forceUpdate();
  }
  
  
  render(){
    const {addProperty, removeProperty} = this;
    const {bonuses, materials} = this.props;
    const propList = this.properties.map((property, index)=>{
      return (
        <RemovableElement key={property.id} onRemove={(ev)=>removeProperty(property.id)}>
          <PropertyInput selections={bonuses} selected={property.type} value={property.value} onChange={(select, value)=>{
            property.type = select;
            property.value = value;
          }}/>
        </RemovableElement>
    )});

    const materialList = this.materials.map((property, index)=>{
        return (
          <RemovableElement key={property.id} onRemove={(ev)=>removeProperty(index)}>
            <PropertyInput selections={bonuses} selected={property.type} value={property.value} onChange={(select, value)=>{
              property.type = select;
              property.value = value;
            }}/>
          </RemovableElement>
    )});
  

    return (
      <fieldset>
        <p>
          <input defaultValue={this.name} onChange={({target})=>{this.name=target.value}}/>
          <button>Добавить предмет</button>
        </p>
        
        <fieldset style={{display:"inline-block"}}>
          <div>
            <span>Добавить свойство</span>
            <button onClick={addProperty}>+</button>
          </div>  

          {propList}
        </fieldset>
        <fieldset style={{display:"inline-block"}}>
          <div>
            <span>Добавить материал</span>
            <button onClick={addProperty}>+</button>
          </div>  
          {materialList}
        </fieldset>
      </fieldset>
    )
  }
}



export default ItemEditor;
