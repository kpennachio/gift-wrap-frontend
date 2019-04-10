import React from 'react';
import { connect } from 'react-redux'

import NextEvent from './dashboard/NextEvent'
import BudgetStatus from './dashboard/BudgetStatus'


const Dashboard = (props) => {

  return (
    <div >
      <h1>My Dashboard</h1>
      <div className="inline">
        <NextEvent />
        <BudgetStatus />
      </div>
    </div>
  );

}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(Dashboard);
