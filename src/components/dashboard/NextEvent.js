import React from 'react';
import { connect } from 'react-redux'
import uuid from 'uuid'


import { Button } from 'semantic-ui-react'

import { resetState } from '../../resetState'



const NextEvent = (props) => {

  const { events } = props


  const orderEvents = () => {
    if (events) {
      return events.sort((a, b) => {
        return new Date(a.dateFormatted) - new Date(b.dateFormatted)
      })
    }
  }

  const renderNextEvent = () => {
    if (events) {
      let noGiftEvents = orderEvents().filter(event => {
        return event.person_gift_events.every(pge => {
          // debugger
          return pge.gift === null
        })
      })
      if (noGiftEvents.length > 0) {
        return (
          <div>
            <p>{noGiftEvents[0].title}</p>
            <p>{noGiftEvents[0].dateFormatted}</p>

          </div>
        )
      }
      else return <p>Nothing on your checklist!</p>
    }
  }

  return (
    <div id="checklist-container">
      <p>Next on your checklist</p>
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
