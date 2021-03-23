
import { combineReducers } from 'redux'
import settingsReducer from "./settings/settingsReducer"
import controlsReducer from "./controls/controlsReducer"

const rootReducer = combineReducers({
  settings: settingsReducer,
  controls: controlsReducer,
  // new reducers go here 
})

export default rootReducer