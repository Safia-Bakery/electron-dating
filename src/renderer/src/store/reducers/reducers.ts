import { combineReducers } from 'redux'
import auth from './auth'
import language from './selects'
import settings from './settings'

export default combineReducers({
  auth,
  language,
  settings
})
