import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'


import { Icon, Grid } from 'semantic-ui-react'

import { slugEventUrl } from '../../slug'


const NextEvent = (props) => {

  const { events } = props

  // Order event by earliest date
  const orderEvents = () => {
    if (events) {
      return events.sort((a, b) => {
        return new Date(a.dateFormatted) - new Date(b.dateFormatted)
      })
    }
  }

  // Render earliest event missing one or more gifts
  const renderNextEvent = () => {
    if (events) {
      let noGiftEvents = orderEvents().filter(event => {
        return event.person_gift_events.some(pge => {
          return pge.gift === null
        })
      })
      if (noGiftEvents.length > 0) {
        return (
          <div >
          <Grid>
            <Grid.Column width="2">
              <Icon size="big" className="unchecked inline" name="check circle outline" />
            </Grid.Column>
            <Grid.Column width="12" >
            <Link to={`/checklist/${slugEventUrl(noGiftEvents[0])}`}>
              <p className="inline event-title">{noGiftEvents[0].title}</p>
              <p className="event-date">{noGiftEvents[0].dateFormatted}</p>
            </Link>
            </Grid.Column>

          </Grid>
          </div>
        )
      }
      else return (
        <div>
        <p>There's nothing on your checklist</p>
        <Link to="/checklist">Add a new event!</Link>
        </div>
      )
    }
  }

  return (
    <div id="checklist-container">
      <h2 className="inline">Next on your checklist</h2>
      <Link to="/checklist" className="inline margin">See All</Link>
      {renderNextEvent()}
    </div>
  );

}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    events: state.events
  }
}

function mapDispatchToProps(dispatch) {
  return {
    deleteGift: (giftId) => dispatch({type: "DELETE_GIFT", payload: giftId})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NextEvent);
