import { combineReducers } from 'redux'
import auth from './auth'
import language from './selects'

export default combineReducers({
  auth,
  language
})
