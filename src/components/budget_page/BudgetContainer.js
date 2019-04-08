import React from 'react';
import { connect } from 'react-redux'

import CircularProgressbar from 'react-circular-progressbar';


const BudgetContainer = (props) => {

  const percentage = 80
  return (
    <div>
      <h1>Budget Container</h1>
      <div className="budget-main-circle">
        <CircularProgressbar
          percentage={percentage}
          text={`${percentage}%`}
        />
      </div>
    </div>
  );

}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(BudgetContainer);
