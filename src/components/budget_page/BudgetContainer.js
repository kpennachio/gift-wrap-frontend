import React from 'react';
import { connect } from 'react-redux'

import Budget from './Budget'

import CircularProgressbar from 'react-circular-progressbar';

import { Icon } from 'semantic-ui-react'


const BudgetContainer = ({events, year, changeYear}) => {

  const allocatedBudget = () => {

      let subtotal = events.map(event => {
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

  const yearBack = () => {
    changeYear(--year)
  }

  const yearForward = () => {
    changeYear(++year)
  }

  const percentage = 80
  return (
    <div>
      <Icon className="year-arrow" onClick={yearBack} name='caret left' />
      <h2 className="year-arrow">{year}</h2>
      <Icon className="year-arrow" onClick={yearForward} name='caret right' />
      <div className="budget-circle-container">
        <div className="budget-main-circle">
          <CircularProgressbar
            percentage={percentage}
            text={`${percentage}%`}
          />
          <p>Budget</p>
          <Budget year={year}/>
        </div>
        <div className="budget-spend-circle">
          <CircularProgressbar
            percentage={percentage}
            text={`${percentage}%`}
          />
          <p>Spend</p>

        </div>
      </div>
    </div>
  );

}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    events: state.events
  }
}

export default connect(mapStateToProps)(BudgetContainer);
