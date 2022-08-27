import { REQUEST_WALLET } from '../actions';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

function reducerWallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_WALLET:
    return {
      ...state,
      currencies: action.currencies,
      expenses: action.expenses,
      editor: action.editor,
      idToEdit: action.idToEdit,
    };
  default:
    return state;
  }
}

export default reducerWallet;
