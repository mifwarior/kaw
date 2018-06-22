import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import AddDataFile from './containers/AddDataFile'
import ItemEditor from './components/ItemEditor'

const bonuses =[
	"Грузоподъемность",
	"Добыча Золота",
  "Добыча реcурсов",
];

const materialTypes = [
  "Вещь",
  "Ресурс"
]
const item = {
  name:"Кишак",
  properties :[
    {
      bonus:0,
      value: 0.14
    }
  ]
}
 
class App extends Component {

  render() {
    return (
      <div className="App">
        <AddDataFile/>
        <ItemEditor bonuses={bonuses}/>
      </div>
    );
  }
}

export default App;
