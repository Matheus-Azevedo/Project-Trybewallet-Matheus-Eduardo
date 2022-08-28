import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { currenciesFetchAPI } from '../redux/actions/index';

class WalletForm extends Component {
  state = {

  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(currenciesFetchAPI());
  }

  render() {
    const { currencies } = this.props;
    return (
      <form>
        <label htmlFor="valor">
          Valor:
          <input
            id="valor"
            data-testid="value-input"
            type="number"
          />
        </label>
        Moeda:
        <select data-testid="currency-input" name="moedas">
          { currencies.map((moeda, index) => (
            <option key={ index } value={ moeda }>{ moeda }</option>
          )) }
        </select>
        Método de pagamento:
        <select data-testid="method-input" name="moedas">
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
        Tag:
        <select data-testid="tag-input" name="moedas">
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
          />
        </label>
      </form>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({ currencies: state.wallet.currencies });

export default connect(mapStateToProps)(WalletForm);
