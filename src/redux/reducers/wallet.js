import {
  REQUEST_CURRENCIES,
  REQUEST_CURRENCIES_FAILURE,
  REQUEST_EXPENSES,
  REQUEST_TOTAL_SPEND,
  REQUEST_DELETE_ELEMENT,
  REQUEST_DECREMENT_TOTAL_SPEND,
  REQUEST_EDIT_EXPENSES,
} from '../actions/index';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  error: null,
  totalSpend: 0,
};

function reducerWallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_DELETE_ELEMENT:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.value),
    };
  case REQUEST_DECREMENT_TOTAL_SPEND:
    return {
      ...state,
      totalSpend: Number(state.totalSpend) - Number(action.value),
    };
  case REQUEST_TOTAL_SPEND:
    return {
      ...state,
      totalSpend: Number(state.totalSpend) + Number(action.value),
    };
  case REQUEST_EDIT_EXPENSES:
    return {
      ...state,
      expenses: action.value,
    };
  case REQUEST_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.value],
    };
  case REQUEST_CURRENCIES:
    return {
      ...state,
      currencies: action.currencies,
    };
  case REQUEST_CURRENCIES_FAILURE:
    return {
      ...state,
      error: action.error,
    };
  default:
    return state;
  }
}

export default reducerWallet;
