// Coloque aqui suas actions

// User Actions
export const REQUEST_EMAIL = 'REQUEST_EMAIL';
export const requestEmail = (email) => ({ type: REQUEST_EMAIL, email });

// Wallet Actions
// Currencies Actions
export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const REQUEST_CURRENCIES_FAILURE = 'REQUEST_CURRENCIES_FAILURE';
export const requestCurrencies = (data) => ({
  type: REQUEST_CURRENCIES, currencies: data });
export const requestCurrenciesFailure = (error) => ({
  type: REQUEST_CURRENCIES_FAILURE,
  error,
});
export function currenciesFetchAPI() {
  return async (dispatch) => {
    try {
      const URL_API = 'https://economia.awesomeapi.com.br/json/all';
      const response = await fetch(URL_API);
      const objeto = await response.json();
      delete objeto.USDT;
      const array = Object.keys(objeto);
      dispatch(requestCurrencies(array));
    } catch (error) {
      dispatch(requestCurrenciesFailure(error.message));
    }
  };
}
