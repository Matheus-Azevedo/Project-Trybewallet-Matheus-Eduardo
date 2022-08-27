import React from 'react';
import '../css/login.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { requestEmail } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isEntryButtonDisabled: true,
  };

  onHandleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      const { email, password } = this.state;
      const characterNecessary = 6;
      const emailTrue = !(email.includes('@') && email.toLowerCase().includes('.com'));
      const passTrue = (password.length < characterNecessary);
      const buttonIsDisabled = emailTrue || passTrue;
      this.setState({ isEntryButtonDisabled: buttonIsDisabled });
    });
  };

  onHandleSubmit = () => {
    const { history, dispatch } = this.props;
    const { email } = this.state;
    dispatch(requestEmail(email));
    history.push('/carteira');
  };

  render() {
    const { email, password, isEntryButtonDisabled } = this.state;
    return (
      <main className="login-container">
        <fieldset>
          <label htmlFor="email">
            Email:
            <input
              id="email"
              data-testid="email-input"
              type="text"
              name="email"
              value={ email }
              onChange={ this.onHandleChange }
            />
          </label>
          <label htmlFor="password">
            Senha:
            <input
              id="password"
              data-testid="password-input"
              type="text"
              name="password"
              value={ password }
              onChange={ this.onHandleChange }
            />
          </label>
          <button
            type="button"
            onClick={ this.onHandleSubmit }
            disabled={ isEntryButtonDisabled }
          >
            Entrar
          </button>
        </fieldset>
      </main>

    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
