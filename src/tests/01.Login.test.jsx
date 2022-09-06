import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWith';
import App from '../App';
// Commit

describe('Teste da aplicação.', () => {
  test('01.Teste se o componente App é renderizado.', () => {
    renderWithRouterAndRedux(<App />);
  });
  test('02.Teste se existe a página de Login.', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/'] });
  });
  test('03.Teste para o inputs do Login.', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/'] });
    const email = screen.getByLabelText(/Email:/i);
    userEvent.type(email, 'matheuseduardo.jp@gmail.com');
    const password = screen.getByLabelText(/Senha:/i);
    userEvent.type(password, '123456');
    const btn = screen
      .getByRole('button', { name: /Entrar/i });
    userEvent.click(btn);
  });
});
