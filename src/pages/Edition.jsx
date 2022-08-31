import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import WalletFormEdit from '../components/WalletFormEdit';

class Edition extends React.Component {
  render() {
    const { match: { params: { id } }, history } = this.props;
    return (
      <div>
        <Header />
        <main>
          <WalletFormEdit idElement={ id } history={ history } />
        </main>
      </div>
    );
  }
}

Edition.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,

};

export default connect()(Edition);
