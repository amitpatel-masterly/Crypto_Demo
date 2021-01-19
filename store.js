import {createStore, applyMiddleware} from'redux';
import createSagaMiddleware from 'redux-saga';
import {reducer} from './model/root-reducer';
import {handler as currencyHandler} from './model/crypto/saga'
const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(currencyHandler);

export {store};