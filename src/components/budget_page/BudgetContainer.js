import React from 'react';
import { connect } from 'react-redux'

import Budget from './Budget'

import CircularProgressbar from 'react-circular-progressbar';

import { Icon } from 'semantic-ui-react'


const BudgetContainer = ({events, year, changeYear, budget, budgets, setBudget}) => {

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


  const yearBack = () => {
    changeYear(--year)
    changeBudget()
  }

  const yearForward = () => {
    changeYear(++year)
    changeBudget()
  }

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

  const paidPercentage = () => {
    if (amountPaid() === 0) {
      return 0
    }
    else {
      return Math.round((amountPaid()/allocatedBudget()) * 100)
    }
  }

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
    <div>
      <Icon className="year-arrow" onClick={yearBack} name='caret left' />
      <h2 className="year-arrow">{year}</h2>
      <Icon className="year-arrow" onClick={yearForward} name='caret right' />
      <div className="budget-circle-container">
        <div className="budget-main-circle">
          <CircularProgressbar
            percentage={budgetPercentage()}
            text={`${budgetPercentage()}%`}
          />
          <div>
            <p>{`Total Budgeted $${allocatedBudget()}`}</p>
          </div>
          <Budget year={year} />
        </div>
        <div className="budget-spend-circle">
          <CircularProgressbar
            percentage={paidPercentage()}
            text={`${paidPercentage()}%`}
          />
          <p>{`Total Spent $${amountPaid()}`}</p>
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
