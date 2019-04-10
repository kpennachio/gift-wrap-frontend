import React from 'react';
import { connect } from 'react-redux'

import CreateAccountForm from './CreateAccountForm'


const CreateAccount = (props) => {

  return (
    <div>
      < CreateAccountForm />
    </div>
  );

}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(CreateAccount);
