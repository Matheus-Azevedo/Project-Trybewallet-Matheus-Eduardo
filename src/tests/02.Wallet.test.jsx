import { screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWith';
import App from '../App';
import mockState from './helpers/mockState';
import Wallet from '../pages/Wallet';

describe('Teste da aplicação.', () => {
  test('01.Teste se o componente App é renderizado.', () => {
    renderWithRouterAndRedux(<App />);
  });
  test('02.Teste se existe a página Carteira.', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
  });
  test('03.Teste para o inputs do forms da Carteira.', () => {
    renderWithRouterAndRedux(<App />, {
      initialEntries: ['/carteira'], initialState: mockState });
    const value = screen.getByLabelText(/Valor:/i);
    userEvent.type(value, '150');
    const description = screen.getByLabelText(/Descrição:/i);
    userEvent.type(description, 'Gastei com o Call of Duty');

    const currency = screen.getByTestId('currency-input');
    const method = screen.getByTestId('method-input');
    const tag = screen.getByTestId('tag-input');
    userEvent.selectOptions(currency, 'USD');
    userEvent.selectOptions(method, 'Dinheiro');
    userEvent.selectOptions(tag, 'Alimentação');

    const btn = screen
      .getByRole('button', { name: /adicionar despesa/i });
    expect(btn).toBeInTheDocument();
    userEvent.click(btn);
  });
  test('04.Teste para Wallet Reducer.', () => {
    const history = createMemoryHistory({ initialEntries: ['/carteira'] });
    const { store } = renderWithRouterAndRedux(<Wallet />, {
      history, initialState: mockState });
    const value = screen.getByLabelText(/Valor:/i);
    userEvent.type(value, '150');
    const description = screen.getByLabelText(/Descrição:/i);
    userEvent.type(description, 'Gastei com o Call of Duty');
    const currency = screen.getByTestId('currency-input');
    const method = screen.getByTestId('method-input');
    const tag = screen.getByTestId('tag-input');
    userEvent.selectOptions(currency, 'USD');
    userEvent.selectOptions(method, 'Dinheiro');
    userEvent.selectOptions(tag, 'Alimentação');
    const btn = screen
      .getByRole('button', { name: /adicionar despesa/i });
    userEvent.click(btn);
    expect(store.getState().wallet.expenses[0].method).toBe('Dinheiro');
  });
  test('05.Teste se a página Carteira realiza o fetch', () => {
    const history = createMemoryHistory({ initialEntries: ['/carteira'] });
    renderWithRouterAndRedux(<Wallet />, { history, initialState: mockState });
    const moeda = screen.getByText(/Dólar Americano/i);
    const btn = screen.getByTestId('delete-btn');
    userEvent.click(btn);
    expect(moeda).not.toBeInTheDocument();
  });
});
