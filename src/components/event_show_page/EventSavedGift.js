import React from 'react';
import { connect } from 'react-redux'

import { Card, Button } from 'semantic-ui-react'




const EventSavedGift = ({id, gift, event, selectedPerson, deleteEventGiftIdea}) => {


  const unSaveIdea = () => {
    fetch(`http://localhost:3000/api/v1/event_gift_ideas/${id}`, {method: "DELETE"})
    .then(resp => {
      deleteEventGiftIdea(id, event.id)
    })
  }

  return (
    <Card>
      <h3>{gift.name}</h3>
      <div onClick={unSaveIdea}>❤️</div>
      <Button>{`Select this gift for ${selectedPerson.name}`}</Button>
    </Card>
  );

}



function mapDispatchToProps(dispatch) {
  return {
    deleteEventGiftIdea: (egi_id, event_id) => {dispatch({type: "DELETE_EVENT_GIFT_IDEA", payload: {event_id: event_id, egi_id: egi_id} } )}

  }
}

export default connect(null, mapDispatchToProps)(EventSavedGift);
