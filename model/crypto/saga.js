import {takeEvery, put, call} from 'redux-saga/effects';
import {
  GET_CURRENCY_LIST,
  GET_CURRENCY_LIST_SUCCESS,
  DELETE_CURRENCY,
  DELETE_CURRENCY_SUCCESS,
} from './actions';

function* handler() {
  yield takeEvery(GET_CURRENCY_LIST, geyCurrency);
  // yield takeEvery(DELETE_CURRENCY, geyCurrency)
}
const getCurrencyAPICall = async (currency) => {
  try {
    const response = await fetch(
      'https://data.messari.io/api/v1/assets/' + currency + '/metrics',
    );
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
  }
};
function* geyCurrency(action) {
  try {
    // API call
    const response = yield call(getCurrencyAPICall, action.payload.params);
    const data = response.data;
    yield put({
      type: GET_CURRENCY_LIST_SUCCESS,
      payload: {
        data,
      },
    });
  } catch (err) {
    // Handle error
  }
}

export {handler};
