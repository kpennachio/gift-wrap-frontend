import React, { Component } from 'react';
import { connect } from 'react-redux'

import BudgetContainer from './budget_page/BudgetContainer'
import BudgetEventContainer from './budget_page/BudgetEventContainer'
import SideNav from './SideNav'
import AppHeader from './AppHeader'


class Budgeter extends Component {

  state = {
    year: ""
  }

  componentDidMount() {
    let year = this.currentYear()
    this.setState({year})
  }

  currentYear = () => {
    let d = new Date()
    return d.getFullYear()
  }

  changeYear = (year) => {
    this.setState({year})
  }

  render() {
    return (
      <div>
      <AppHeader logout={this.props.logout}/>
      <SideNav />
      <div id="budget-image">
        <div id="budget-header">
          <h1>My Gift Budget</h1>
        </div>

        <div >
          <BudgetContainer year={this.state.year} changeYear={this.changeYear}/>
        </div>

      </div >
        <BudgetEventContainer year={this.state.year}/>

      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setBudgets: (budgets) => dispatch({type: "SET_BUDGETS", payload: budgets}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Budgeter);
