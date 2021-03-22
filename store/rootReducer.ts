
import { combineReducers } from 'redux'
import settingsReducer from "./settings/settingsReducer"

const rootReducer = combineReducers({
  settings: settingsReducer,
  // new reducers go here 
})

export default rootReducer