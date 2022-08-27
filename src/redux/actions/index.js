// Coloque aqui suas actions
export const REQUEST_EMAIL = 'REQUEST_EMAIL';
export const REQUEST_WALLET = 'REQUEST_WALLET';

export const requestEmail = (email) => ({ type: REQUEST_EMAIL, email });
export const requestWallet = () => ({ type: REQUEST_WALLET });
