import React from 'react';
import { connect } from 'react-redux'




const BudgetContainer = (props) => {

  return (
    <div>
      <h1>Budget Container</h1>
    </div>
  );

}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(BudgetContainer);
