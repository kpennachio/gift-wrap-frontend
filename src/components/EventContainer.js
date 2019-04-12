import React from 'react';
import { connect } from 'react-redux'
import uuid from 'uuid'

import Event from './Event'
import EventForm from './EventForm'




const EventContainer = (props) => {
  const { events } = props



  const orderEvents = () => {
    if (events) {
      return events.sort((a, b) => {
        return new Date(a.dateFormatted) - new Date(b.dateFormatted)
      })
    }
  }

  const renderAllEvents = () => {
    if (events) {
      return orderEvents().map(event => <Event key={uuid()} event={event} pge={event.person_gift_events}/>)
    }
  }

  const eventsByMonth = () => {
    let ordered = {}
    orderEvents().forEach(event => {
      if (!ordered[event.year]) {
        ordered[event.year] = {}
        ordered[event.year][event.month] = []
        ordered[event.year][event.month].push(event)
      }
      else if (!ordered[event.year][event.month]) {
        ordered[event.year][event.month] = []
        ordered[event.year][event.month].push(event)
      }
      else {
        ordered[event.year][event.month].push(event)
      }
    })
    return ordered
  }

  const renderEvents = () => {
    let yearObj = eventsByMonth()
    let array = []
    for (const year in yearObj) {
      for (const month in yearObj[year]) {
        array.push(month)
        for (const event in yearObj[year][month]) {
          array.push(yearObj[year][month][event])
        }
      }
    }
    console.log(array);
    return array.map(a => {
      if (typeof a === "string"){
        return <p>a</p>
      }
      else {
        return <Event key={uuid()} event={a} pge={a.person_gift_events}/>
      }
    })
  }



  return (
    <div >

      <EventForm />
      <h2>all events</h2>
      {renderEvents()}
    </div>
  );

}

function mapStateToProps(state) {
  return {
    events: state.events
  }
}

export default connect(mapStateToProps)(EventContainer);
