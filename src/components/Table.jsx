import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </thead>
        { expenses.map((despesa, index) => (
          <tbody key={ index }>
            <tr>
              <td>{ despesa.description }</td>
              <td>{ despesa.tag }</td>
              <td>{ despesa.method }</td>
              <td>
                { despesa.exchangeRates[despesa.currency].code }
                { Number(despesa.value).toFixed(2) }
              </td>
              <td>{ despesa.exchangeRates[despesa.currency].name }</td>
              <td>
                { despesa.exchangeRates[despesa.currency].code }
                { Number(despesa.exchangeRates[despesa.currency].ask).toFixed(2) }
              </td>
              <td>
                { despesa.exchangeRates[despesa.currency].codein }
                { (Number(despesa.exchangeRates[despesa.currency].ask)
                  * Number(despesa.value)).toFixed(2) }
              </td>
              <td>Real</td>
              <td>
                <button type="button">Editar</button>
                <button type="button">Excluir</button>
              </td>
            </tr>
          </tbody>
        )) }
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
