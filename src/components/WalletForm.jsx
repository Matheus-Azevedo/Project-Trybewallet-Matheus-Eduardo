import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  currenciesFetchAPI,
  requestExpenses,
  requestTotalSpend,
} from '../redux/actions/index';

class WalletForm extends Component {
  state = {
    id: 0,
    value: 0,
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    description: 'Sem descrição',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(currenciesFetchAPI());
  }

  expensesFetchAPI = async () => {
    const URL_API = 'https://economia.awesomeapi.com.br/json/all';
    const response = await fetch(URL_API);
    const objeto = await response.json();
    delete objeto.USDT;
    return objeto;
  };

  onInputChange = ({ target }) => {
    const { expenses } = this.props;
    const { name, value } = target;
    this.setState({ [name]: value, id: expenses.length });
  };

  onSubmit = async (event) => {
    event.preventDefault();
    const { dispatch } = this.props;
    const data = await this.expensesFetchAPI();
    this.setState({ exchangeRates: data }, () => {
      const { exchangeRates, currency, value } = this.state;
      const moeda = Object.keys(exchangeRates).filter((coin) => (
        coin === currency
      ));
      const result = (exchangeRates[moeda].ask * value);
      dispatch(requestTotalSpend(result));
      dispatch(requestExpenses(this.state));
      this.setState({
        value: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
        description: '',
      });
    });
  };

  render() {
    const { value, currency, method, tag, description } = this.state;
    const { currencies } = this.props;
    return (
      <form>
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
        Método de pagamento:
        <select
          data-testid="method-input"
          name="method"
          value={ method }
          onChange={ this.onInputChange }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
        Tag:
        <select
          data-testid="tag-input"
          name="tag"
          value={ tag }
          onChange={ this.onInputChange }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
        <label htmlFor="description">
          Descrição:
          <input
            id="description"
            data-testid="description-input"
            type="text"
            name="description"
            value={ description }
            onChange={ this.onInputChange }
          />
        </label>
        <button type="submit" onClick={ this.onSubmit }>Adicionar despesa</button>
      </form>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(WalletForm);
