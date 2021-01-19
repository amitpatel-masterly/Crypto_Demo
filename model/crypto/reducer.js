import {GET_CURRENCY_LIST, GET_CURRENCY_LIST_SUCCESS} from './actions';

const initialState = {
  currency_list: [],
};

const reducer = (state = initialState, action) => {

  switch (action.type) {
    case GET_CURRENCY_LIST_SUCCESS: {
      const data = action.payload;
      let list = state.currency_list;
      list.push(data);

      return {currency_list: list};
    }

    default:
      return state;
  }
};

export {reducer};
