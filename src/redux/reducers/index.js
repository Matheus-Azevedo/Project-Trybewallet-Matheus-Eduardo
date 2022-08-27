// import user from './user';
// import wallet from './wallet';

// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global
import { combineReducers } from 'redux';
import reducerUser from './user';
import reducerWallet from './wallet';

const rootReducer = combineReducers({
  user: reducerUser,
  wallet: reducerWallet,
});

export default rootReducer;
