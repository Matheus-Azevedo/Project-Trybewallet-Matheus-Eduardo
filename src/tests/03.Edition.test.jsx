import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import renderWithRouterAndRedux from './helpers/renderWith';
import App from '../App';
import mockState from './helpers/mockState';

describe('Teste da aplicação.', () => {
  test('01.Teste se o componente App é renderizado.', () => {
    renderWithRouterAndRedux(<App />);
  });
  test('02.Teste se existe a página de Edition.', () => {
    const history = createMemoryHistory({ initialEntries: ['/carteira'] });
    const url = renderWithRouterAndRedux(<App />, {
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

    const btn2 = screen
      .getByRole('button', { name: /Editar/i });
    userEvent.click(btn2);
    const { pathname } = url.history.location;
    expect(pathname).toBe('/edition/0');
  });
  test('03.Teste se a página Edition tem os inputs', () => {
    const five = 5;
    const history = createMemoryHistory({ initialEntries: ['/carteira'] });
    renderWithRouterAndRedux(<App />, {
      history, initialState: mockState });
    const btn2 = screen
      .getByRole('button', { name: /Editar/i });
    userEvent.click(btn2);
    expect(screen.getByLabelText(/Valor:/i)).toHaveValue(five);
    expect(screen.getByLabelText(/Descrição:/i)).toHaveValue('Sem descrição');
    expect(screen.getByTestId('currency-input')).toHaveValue('USD');
    expect(screen.getByTestId('method-input')).toHaveValue('Dinheiro');
    expect(screen.getByTestId('tag-input')).toHaveValue('Alimentação');
  });
});
