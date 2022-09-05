import React from 'react';
import renderWithRouterAndRedux from './helpers/renderWith';
import App from '../App';
// import { screen } from '@testing-library/react';
// import { createMemoryHistory } from 'history';
// import userEvent from '@testing-library/user-event';

describe('Teste da aplicação.', () => {
  test('01.Teste se o componente App é renderizado.', () => {
    renderWithRouterAndRedux(<App />);
  });
  test('02.Teste se existe a página de Edition.', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/edition/:id'] });
    // const textAreas = screen.getAllByRole('textbox');
    // textAreas.forEach((text) => expect(text).toBeInTheDocument());
    // textAreas.forEach((text) => userEvent.type(text, 'Matheus'));
  });
  // test('03.Teste para o componente FormDataDisplay.', () => {
  //   renderWithRouterAndRedux(<App />, { initialEntries: ['/formdisplay'] });
  //   const name = screen.getByText(/nome/i);
  //   expect(name).toBeInTheDocument();
  // });
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
