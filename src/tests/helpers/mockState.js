import mockData from './mockData';

const mockState = {
  user: {
    email: 'matheuseduardo.jp@gmail.com',
  },
  wallet: {
    currencies: [
      'USD',
      'CAD',
      'GBP',
      'ARS',
      'BTC',
      'LTC',
      'EUR',
      'JPY',
      'CHF',
      'AUD',
      'CNY',
      'ILS',
      'ETH',
      'XRP',
      'DOGE',
    ],
    expenses: [
      {
        id: 0,
        value: '5',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
        description: 'Sem descrição',
        exchangeRates: mockData,
      },
    ],
    editor: false,
    idToEdit: 0,
    error: null,
    totalSpend: 25.783,
  },
};

export default mockState;
