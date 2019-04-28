import React, { Fragment } from 'react';
import { connect } from 'react-redux'

import NextEvent from './dashboard/NextEvent'
import BudgetStatus from './dashboard/BudgetStatus'
import EmailReminder from './dashboard/EmailReminder'
import SideNav from './SideNav'
import AppHeader from './AppHeader'



const Dashboard = (props) => {

  return (
    <Fragment >
      <AppHeader logout={props.logout}/>
      <SideNav />
      <div id="dashboard-header" >
        <h1>My Dashboard</h1>
      </div>
      <div id="dashboard-content">
        <div className="inline">
          <NextEvent />
          <EmailReminder />
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
