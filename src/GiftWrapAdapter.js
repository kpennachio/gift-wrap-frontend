import React from 'react';
import { connect } from 'react-redux'

class GiftWrapAdapter {


  static editPersonGiftEvent(pgeId, data) {
    fetch(`http://localhost:3000/api/v1/person_gift_events/${pgeId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(resp => resp.json())
  }
}

export default GiftWrapAdapter
