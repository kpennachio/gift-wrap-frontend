import React, { Fragment } from 'react';
import { connect } from 'react-redux'

import NextEvent from './dashboard/NextEvent'
import BudgetStatus from './dashboard/BudgetStatus'
import SideNav from './SideNav'
import Header from './Header'



const Dashboard = (props) => {

  return (
    <Fragment >
      <Header logout={props.logout}/>
      <SideNav />
      <div className="planner-content">
        <h1>My Dashboard</h1>
        <div className="inline">
          <NextEvent />
          <BudgetStatus />
        </div>
      </div>
    </Fragment>
  );

}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(Dashboard);
