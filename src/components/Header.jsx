import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, totalSpend } = this.props;
    return (
      <header className="header">
        <div className="header-img" />
        <div className="header-content">
          <div data-testid="email-field">
            {email}
          </div>
          <div className="header-text-content">
            Total gasto:
            <div data-testid="header-currency-field">
              BRL
            </div>
            <div data-testid="total-field">
              { Number(totalSpend).toFixed(2) }
            </div>
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  totalSpend: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  totalSpend: state.wallet.totalSpend,
});

export default connect(mapStateToProps)(Header);
