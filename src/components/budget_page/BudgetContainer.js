import React from 'react';
import { connect } from 'react-redux'

import Budget from './Budget'

import CircularProgressbar from 'react-circular-progressbar';

import { Icon } from 'semantic-ui-react'


// Budgeter page: container for budget and circular progressbars

const BudgetContainer = ({events, year, changeYear, budget, budgets, setBudget}) => {


  // add all budgets for each person in each event for given year to get total allocated budget
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

  // add all gift costs for each person in each event for given year to get total amount paid
  const amountPaid = () => {
    let selectedEvents = events.filter(event => event.year === year)
      let subtotal = selectedEvents.map(event => {
          if (event.person_gift_events.length > 1) {
            return event.person_gift_events.reduce((sum, pge) => parseInt(sum.gift_actual_cost) + parseInt(pge.gift_actual_cost))
          }
          else if (event.person_gift_events.length === 1) {
            return parseInt(event.person_gift_events[0].gift_actual_cost)
          }
          else return 0
        })
      if (subtotal.length > 0) {
        return subtotal.reduce((sum, price) => sum + price)
      }
      else return 0
  }


  // callbacks for arrows on click - change year back or forward
  const yearBack = () => {
    changeYear(--year)
    changeBudget()
  }

  const yearForward = () => {
    changeYear(++year)
    changeBudget()
  }

  // on year change, find budget for that year and change in state
  const changeBudget = () => {
    let budgetObj = budgets.find(budget => budget.year === year)
    if (budgetObj) {
      setBudget(budgetObj)
      return budgetObj
    }
    else {
      setBudget({})
    }
  }

  // percentage of gift budget spent
  // if nothing has been budgeted, return 0%
  // else divide (amount spent)/(allocated budget) * 100 for percent
  const paidPercentage = () => {
    if (allocatedBudget() === 0) {
      return 0
    }
    else {
      return Math.round((amountPaid()/allocatedBudget()) * 100)
    }
  }

  // percentage of gift budget spent
  // if nothing has been spent, return 0%
  // else divide (amount spent)/(allocated budget) * 100 for percent
  const budgetPercentage = () => {
    if (budget) {
      if (parseInt(budget) === 0) {
        return 0
      }
      else {
        return Math.round((allocatedBudget()/parseInt(budget)) * 100)
      }
    }
    else return 0
  }


  return (
    <div id="budget-progress-container">
      <Icon className="year-arrow" onClick={yearBack} name='caret left' />
      <h2 className="year-arrow">{year}</h2>
      <Icon className="year-arrow" onClick={yearForward} name='caret right' />
      <div className="budget-circle-container">
        <div id="annual-budget">
          <Budget year={year} />
        </div>

        <div className="budget-main-circle">
          <CircularProgressbar
            percentage={budgetPercentage()}
            text={`${budgetPercentage()}%`}
          />
          <div className="budget-text">
            <p>Total Budgeted</p>
            <p>{`$${allocatedBudget()}`}</p>
          </div>
        </div>

        <div className="budget-spend-circle">
          <CircularProgressbar
            percentage={paidPercentage()}
            text={`${paidPercentage()}%`}
          />
          <div className="budget-text">
            <p>Total Spent</p>
            <p>{`$${amountPaid()}`}</p>
          </div>
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
    budget: state.budget.budget
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setBudget: (budget) => dispatch({type: "SET_BUDGET", payload: budget})

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BudgetContainer);
