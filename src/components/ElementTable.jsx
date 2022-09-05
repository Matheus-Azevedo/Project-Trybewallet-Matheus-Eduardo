import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  requestDecrementTotalSpend,
  requestDeleteElementTable,
} from '../redux/actions';

class ElementTable extends Component {
  deleteExpense = () => {
    const { id, dispatch, exchangeRates, value, currency } = this.props;
    const result = (Number(exchangeRates[currency].ask) * Number(value)).toFixed(2);
    dispatch(requestDecrementTotalSpend(result));
    dispatch(requestDeleteElementTable(id));
  };

  render() {
    const {
      description, tag, method, id,
      value, currency, exchangeRates,
    } = this.props;
    return (
      <tr>
        <td>{ description }</td>
        <td>{ tag }</td>
        <td>{ method }</td>
        <td>
          { exchangeRates[currency].code }
          { Number(value).toFixed(2) }
        </td>
        <td>{ exchangeRates[currency].name }</td>
        <td>
          { exchangeRates[currency].code }
          { Number(exchangeRates[currency].ask).toFixed(2) }
        </td>
        <td>
          { exchangeRates[currency].codein }
          { (Number(exchangeRates[currency].ask)
            * Number(value)).toFixed(2) }
        </td>
        <td>Real</td>
        <td>
          <Link to={ `/edition/${id}` }>
            <button className="button" data-testid="edit-btn" type="button">
              Editar
            </button>
          </Link>
          <button
            className="button"
            data-testid="delete-btn"
            type="button"
            onClick={ this.deleteExpense }
          >
            Excluir
          </button>
        </td>
      </tr>
    );
  }
}

ElementTable.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  method: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  exchangeRates: PropTypes.objectOf(PropTypes.shape()).isRequired,
};

export default connect()(ElementTable);
