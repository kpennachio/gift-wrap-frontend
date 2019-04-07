import React from 'react';
import { connect } from 'react-redux'

import { Card, Button } from 'semantic-ui-react'




const PersonSavedGift = ({id, gift, pge, selectedPerson, deletePersonGiftIdea}) => {


  const unSaveIdea = () => {
    fetch(`http://localhost:3000/api/v1/person_gift_ideas/${id}`, {method: "DELETE"})
    .then(resp => {
      deletePersonGiftIdea(id, selectedPerson.id)
    })
  }

  const selectGift = () => {
    let data = {
      gift_id: gift.id
    }
    fetch(`http://localhost:3000/api/v1/person_gift_events/${pge.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(resp => resp.json())
    .then(pge => {
      console.log(pge);
    })
  }

  return (
    <Card>
      <h3>{gift.name}</h3>
      <div onClick={unSaveIdea}>heart</div>
      <Button onClick={selectGift}>{`Select this gift for ${selectedPerson.name}`}</Button>
    </Card>
  );

}


function mapDispatchToProps(dispatch) {
  return {
    deletePersonGiftIdea: (pgi_id, person_id) => {dispatch({type: "DELETE_PERSON_GIFT_IDEA", payload: {person_id: person_id, pgi_id: pgi_id} } )}

  }
}

export default connect(null, mapDispatchToProps)(PersonSavedGift);
