import React, { Component} from 'react';
import { connect } from 'react-redux'

import { Grid, Form, Button, Icon, Modal, Header, Input } from 'semantic-ui-react'

import { resetState } from '../../resetState'

import BudgetForm from './BudgetForm'



class Paid extends Component {

  state = {

  }

  amountPaid = () => {
    let selectedEvents = this.props.events.filter(event => event.year === this.props.year)
      let subtotal = selectedEvents.map(event => {
          if (event.person_gift_events.length > 1) {
            return event.person_gift_events.reduce((sum, pge) => sum.gift_actual_cost + pge.gift_actual_cost)
          }
          else if (event.person_gift_events.length === 1) {
            return event.person_gift_events[0].gift_actual_cost
          }
          else return 0
        })
      if (subtotal.length > 0) {
        return subtotal.reduce((sum, price) => sum + price)
      }
      else return 0
  }




  render() {

    return (
      <div>
        Total Paid
      </div>
    );

  }

}



function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    events: state.events,
    budgets: state.budgets,
    url: state.url,
    budget: state.budget
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addBudget: (budget) => dispatch({type: "ADD_BUDGET", payload: budget}),
    editBudget: (budget) => dispatch({type: "EDIT_BUDGET", payload: budget}),
    setBudget: (budget) => dispatch({type: "SET_BUDGET", payload: budget})

  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Paid);
