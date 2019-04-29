import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import CircularProgressbar from 'react-circular-progressbar';



const BudgetStatus = ({events, year, changeYear, budget, budgets, setBudget}) => {

  const allocatedBudget = () => {
    let selectedEvents = events.filter(event => event.year === year)
      let subtotal = selectedEvents.map(event => {
          if (event.person_gift_events.length > 1) {
            return event.person_gift_events.reduce((sum, pge) => sum.price_max + pge.price_max)
          }
          else if (event.person_gift_events.length === 1) {
            return event.person_gift_events[0].price_max
          }
          else return 0
        })
      if (subtotal.length > 0) {
        return subtotal.reduce((sum, price) => sum + price)
      }
      else return 0
  }


  const budgetPercentage = () => {
    if (budget) {
      if (parseInt(budget) === 0) {
        return 0
      }
      else {
        return Math.round((allocatedBudget()/budget) * 100)
      }
    }
    else return 0
  }

  const renderBudget = () => {
    if (budget) {
      return parseInt(budget)
    }
    else {
      return 0
    }
  }


  return (
    <div>
        <div id="budget-status-container">
          <h2 className="inline margin-right">Gift Budget Status</h2>
          <Link className="inline" to="/budgeter">See Budget</Link>
          <div id="dashboard-budget">
            <CircularProgressbar
              percentage={budgetPercentage()}
              text={`${budgetPercentage()}%`}
            />
          </div>
          <div className="inline">
            <p>{`Total Budgeted $${allocatedBudget()}`}</p>
            <p>{`${year} max gift budget: $${renderBudget()}`}</p>
          </div>
        </div>
    </div>
  );

  }

  function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    events: state.events,
    budgets: state.budgets,
    budget: state.budget.budget,
    year: state.year
    }
  }



export default connect(mapStateToProps)(BudgetStatus);
