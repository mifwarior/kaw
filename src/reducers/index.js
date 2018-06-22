import AddItemReducer from './AddItemReducer'
import {combineReducers } from 'redux'
import bonusReducer from './BonusReducer';

export default combineReducers({
  items:AddItemReducer,
  bonus:bonusReducer
})