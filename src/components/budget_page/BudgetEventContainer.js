import React from 'react';
import { connect } from 'react-redux'
import uuid from 'uuid'

import BudgetEvent from './BudgetEvent'

import { Grid, Accordion } from 'semantic-ui-react'



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
    <div >
    <Grid>
      <Grid.Column width={4}><p>Date</p></Grid.Column>
      <Grid.Column width={5}><p>Event</p></Grid.Column>
      <Grid.Column width={2}><p>Budget</p></Grid.Column>
      <Grid.Column width={2}><p>Spend</p></Grid.Column>
    </Grid>
    <Accordion
    fluid
    className="event"
    >
      {renderAllEvents()}

    </Accordion>
    </div>
  );

}

function mapStateToProps(state) {
  return {
    events: state.events
  }
}

export default connect(mapStateToProps)(BudgetEventContainer);
