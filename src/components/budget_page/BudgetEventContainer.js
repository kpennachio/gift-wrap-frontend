import React, { Fragment } from 'react';
import { connect } from 'react-redux'
import uuid from 'uuid'

import BudgetEvent from './BudgetEvent'

import { Grid, Accordion } from 'semantic-ui-react'


// Budgeter page: container for events breaking down budget

const BudgetEventContainer = (props) => {
  const { events, year } = props


  const orderEvents = () => {
    if (events) {
      let selectedEvents = events.filter(event => event.year === year)
      return selectedEvents.sort((a, b) => {
        return new Date(a.dateFormatted) - new Date(b.dateFormatted)
      })
    }
  }

  const renderAllEvents = () => {
    if (events) {

      return orderEvents().map(event => <BudgetEvent key={uuid()} event={event} pges={event.person_gift_events}/>)
    }
  }

  return (
    <Fragment>
      <div id="budget-headings-container">
      <Grid id="budget-headings">
        <Grid.Column width={4}><p className="budget-col">Date</p></Grid.Column>
        <Grid.Column width={5}><p className="budget-col">Event</p></Grid.Column>
        <Grid.Column width={2}><p className="budget-col">Budget</p></Grid.Column>
        <Grid.Column width={2}><p className="budget-col">Spend</p></Grid.Column>
      </Grid>
      </div>
      <Accordion
      fluid
      className="event"
      >
      <div className="budget-content">
        {renderAllEvents()}
      </div>
      </Accordion>
    </Fragment>
  );

}

function mapStateToProps(state) {
  return {
    events: state.events
  }
}

export default connect(mapStateToProps)(BudgetEventContainer);
