import {combineReducers} from 'redux';
import {reducer as currencyReducer} from './crypto/reducer';

const reducer = combineReducers({
  currency: currencyReducer,
});

export {reducer};
