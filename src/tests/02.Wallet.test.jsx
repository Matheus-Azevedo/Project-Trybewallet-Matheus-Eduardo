import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWith';
import App from '../App';
// import { createMemoryHistory } from 'history';

describe('Teste da aplicação.', () => {
  test('01.Teste se o componente App é renderizado.', () => {
    renderWithRouterAndRedux(<App />);
  });
  test('02.Teste se existe a página Carteira.', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
  });
  test('03.Teste para o inputs do forms da Carteira.', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    const value = screen.getByLabelText(/Valor:/i);
    userEvent.type(value, '150');
    const description = screen.getByLabelText(/Descrição:/i);
    userEvent.type(description, 'Gastei com o Call of Duty');
    const btn = screen
      .getByRole('button', { name: /adicionar despesa/i });
    expect(btn).toBeInTheDocument();
    userEvent.click(btn);
  });
  // test('04.Teste para o PersonalForm.', () => {
  //   renderWithRouterAndRedux(<App />, { initialEntries: ['/'] });
  //   const name = screen.getByLabelText(/nome/i);
  //   userEvent.type(name, 'Matheus');
  //   const btn = screen
  //     .getByRole('button', { name: /enviar/i });
  //   expect(btn).toBeInTheDocument();
  //   userEvent.click(btn);
  // });
  // test('05.Teste dos states.', () => {
  //   const history = createMemoryHistory();
  //   const { store } = renderWithRouterAndRedux(<ProfessionalForm history={ history } />);
  //   const curriculum = screen.getByLabelText(/Resumo do currículo:/i);
  //   userEvent.type(curriculum, 'Meu curriculum');
  //   const btn = screen
  //     .getByRole('button', { name: /enviar/i });
  //   userEvent.click(btn);
  //   // console.log(store.getState().profile.professional.curriculum);
  //   expect(store.getState().profile.professional.curriculum).toBe('Meu curriculum');
  // });
});
