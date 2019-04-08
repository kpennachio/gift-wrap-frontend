import React, { Component } from 'react';
import { connect } from 'react-redux'

import BudgetContainer from './budget_page/BudgetContainer'
import BudgetEventContainer from './budget_page/BudgetEventContainer'



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
      <h1>Your Gift Budget</h1>
      <BudgetContainer year={this.state.year} changeYear={this.changeYear}/>
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
