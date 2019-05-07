import React from 'react';
import { connect } from 'react-redux'
import uuid from 'uuid'

import Event from './Event'


// Checklist page - container for event components

const EventContainer = (props) => {
  const { events, showAllEvents } = props


  // order events by date and filter by events without gifts
  const orderEvents = () => {
    if (events) {
      let allEvents = events.sort((a, b) => {
        return new Date(a.dateFormatted) - new Date(b.dateFormatted)
      })

      if (showAllEvents) {
        return allEvents
      }
      else {
        return allEvents.filter(event => event.person_gift_events.some(pge => {
          return pge.gift === null
        }))
      }
    }
  }


  // ############ Take ordered events and add in month headings #############
  // First create object with year and month keys to organize events
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

  // Then render event objects separated by month headings
  // Iterated through eventsByMonth() returned object
  const renderEvents = () => {
    let months = [ "", "January", "February", "March", "April", "May", "June",
           "July", "August", "September", "October", "November", "December" ]

    // Flatten object into array
    // At every change in month, insert a string with "Month Year"
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
    // Map over array to either return "Month Year" or event component
    // Event components will be separated by month headings
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
