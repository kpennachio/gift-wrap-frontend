import React from 'react';
import { connect } from 'react-redux'

import BudgetContainer from './budget_page/BudgetContainer'
import BudgetEventContainer from './budget_page/BudgetEventContainer'



const Budgeter = (props) => {

  return (
    <div>
      <h1>Your Gift Budget</h1>
      <BudgetContainer />
      <BudgetEventContainer/>
    </div>
  );

}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(Budgeter);
