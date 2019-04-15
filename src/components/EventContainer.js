import React from 'react';
import { connect } from 'react-redux'
import uuid from 'uuid'

import Event from './Event'
import EventForm from './EventForm'




const EventContainer = (props) => {
  const { events, showAllEvents } = props



  const orderEvents = () => {
    if (events) {
      let allEvents = events.sort((a, b) => {
        return new Date(a.dateFormatted) - new Date(b.dateFormatted)
      })

      if (showAllEvents) {
        return allEvents
      }
      else {
        return allEvents.filter(event => event.person_gift_events.every(pge => {
          return pge.gift === null
        }))
      }
    }
  }

  // const renderAllEvents = () => {
  //   if (events) {
  //     return orderEvents().map(event => <Event key={uuid()} event={event} pge={event.person_gift_events}/>)
  //   }
  // }

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
    let months = [ "January", "February", "March", "April", "May", "June",
           "July", "August", "September", "October", "November", "December" ]


    let yearObj = eventsByMonth()
    let array = []
    for (const year in yearObj) {
      for (const month in yearObj[year]) {
        array.push(`${months[month]} ${year}`)
        for (const event in yearObj[year][month]) {
          array.push(yearObj[year][month][event])
        }
      }
    }
    return array.map(a => {
      if (typeof a === "string"){
        return <p className="checklist-month" key={uuid()}>{a}</p>
      }
      else {
        return <Event key={uuid()} event={a} pge={a.person_gift_events}/>
      }
    })
  }



  return (
    <div id="event-container">
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
