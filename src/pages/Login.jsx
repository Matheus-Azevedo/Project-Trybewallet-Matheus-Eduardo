import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { requestEmail } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isEntryButtonDisabled: true,
  };

  onInputChange = ({ target }) => {
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

  onSubmit = () => {
    const { history, dispatch } = this.props;
    const { email } = this.state;
    dispatch(requestEmail(email));
    history.push('/carteira');
  };

  render() {
    const { email, password, isEntryButtonDisabled } = this.state;
    return (
      <main className="box-container">
        <fieldset className="box is-mod-to-login">
          <h1>TRYBEWALLET</h1>
          <div className="field">
            <label htmlFor="email">
              Email:
              <input
                id="email"
                data-testid="email-input"
                type="text"
                name="email"
                value={ email }
                onChange={ this.onInputChange }
              />
            </label>
          </div>
          <div className="field">
            <label htmlFor="password">
              Senha:
              <input
                id="password"
                data-testid="password-input"
                type="text"
                name="password"
                value={ password }
                onChange={ this.onInputChange }
              />
            </label>
          </div>
          <button
            className="button"
            type="button"
            onClick={ this.onSubmit }
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
