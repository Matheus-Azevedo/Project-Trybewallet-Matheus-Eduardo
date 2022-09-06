import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ElementTable from './ElementTable';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <table className="table is-fullwidth is-hoverable">
        <thead className="thead">
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          { expenses.map((despesa) => (
            <ElementTable
              key={ despesa.id }
              id={ despesa.id }
              description={ despesa.description }
              tag={ despesa.tag }
              method={ despesa.method }
              value={ despesa.value }
              currency={ despesa.currency }
              exchangeRates={ despesa.exchangeRates }
            />
          )) }
        </tbody>
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
