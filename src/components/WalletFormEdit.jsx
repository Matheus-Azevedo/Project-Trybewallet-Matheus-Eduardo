import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  requestEditExpenses,
  requestTotalSpend,
  requestDecrementTotalSpend,
} from '../redux/actions/index';

class WalletFormEdit extends Component {
  state = {
    id: 0,
    value: 0,
    currency: '',
    method: '',
    tag: '',
    description: '',
    exchangeRates: {},
  };

  componentDidMount() {
    const { expenses, idElement } = this.props;
    console.log(expenses[idElement].value);
    this.setState({
      id: expenses[idElement].id,
      value: expenses[idElement].value,
      oldValue: expenses[idElement].value,
      currency: expenses[idElement].currency,
      oldCurrency: expenses[idElement].currency,
      method: expenses[idElement].method,
      tag: expenses[idElement].tag,
      description: expenses[idElement].description,
      exchangeRates: expenses[idElement].exchangeRates,
    });
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  onSubmit = () => {
    const { dispatch, expenses, idElement, history } = this.props;
    const {
      id, value, currency, method, tag,
      description, exchangeRates,
      oldValue, oldCurrency,
    } = this.state;
    const object = { id, value, currency, method, tag, description, exchangeRates };
    expenses.splice(`${idElement}`, 1, object);

    const decrement = (exchangeRates[oldCurrency].ask * oldValue);
    dispatch(requestDecrementTotalSpend(decrement));

    dispatch(requestEditExpenses(expenses));

    const increment = (exchangeRates[currency].ask * value);
    dispatch(requestTotalSpend(increment));

    history.push('/carteira');
  };

  render() {
    const { value, currency, method, tag, description } = this.state;
    const { currencies } = this.props;
    return (
      <div className="box-container-2">
        <form className="box is-mod-to-forms-edit">
          <label htmlFor="value">
            Valor:
            <input
              id="value"
              data-testid="value-input"
              type="number"
              name="value"
              value={ value }
              onChange={ this.onInputChange }
            />
          </label>
          Moeda:
          <select
            data-testid="currency-input"
            name="currency"
            value={ currency }
            onChange={ this.onInputChange }
          >
            { currencies.map((coin, index) => (
              <option key={ index } value={ coin }>{ coin }</option>
            )) }
          </select>
          M??todo de pagamento:
          <select
            data-testid="method-input"
            name="method"
            value={ method }
            onChange={ this.onInputChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cart??o de cr??dito">Cart??o de cr??dito</option>
            <option value="Cart??o de d??bito">Cart??o de d??bito</option>
          </select>
          Tag:
          <select
            data-testid="tag-input"
            name="tag"
            value={ tag }
            onChange={ this.onInputChange }
          >
            <option value="Alimenta????o">Alimenta????o</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Sa??de">Sa??de</option>
          </select>
          <label htmlFor="description">
            Descri????o:
            <input
              id="description"
              data-testid="description-input"
              type="text"
              name="description"
              value={ description }
              onChange={ this.onInputChange }
            />
          </label>
          <button
            className="button"
            type="button"
            onClick={ this.onSubmit }
          >
            Editar despesa
          </button>
        </form>
      </div>
    );
  }
}

WalletFormEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  idElement: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(WalletFormEdit);
