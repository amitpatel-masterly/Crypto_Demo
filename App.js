import React from 'react';
import {Provider} from 'react-redux' ;
import {store} from './store';
import Home from './app/index'


const Root = () => {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
};

export default Root;
