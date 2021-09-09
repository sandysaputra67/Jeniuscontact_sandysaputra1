import { combineReducers } from 'redux';

// ## Generator Reducer Imports
import contactadd from '../modules/contactadd/ContactaddState';
import contactlist from '../modules/contactlist/ContactlistState';
import splashScreen from '../modules/splashScreen/SplashScreenState';
import app from '../modules/AppState';

export default combineReducers({
  // ## Generator Reducers
  contactadd,
  contactlist,
  splashScreen,
  app,
});
