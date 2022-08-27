import { REQUEST_EMAIL } from '../actions';

// Esse reducer será responsável por tratar as informações da pessoa usuária

const INITIAL_STATE = {
  email: '', // string que armazena o email da pessoa usuária
};

function reducerUser(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_EMAIL:
    return {
      ...state,
      email: action.email,
    };
  default:
    return state;
  }
}

export default reducerUser;
