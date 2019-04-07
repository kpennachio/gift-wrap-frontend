import React from 'react';
import { connect } from 'react-redux'

import { Card } from 'semantic-ui-react'




const PersonSavedGift = ({id, gift, selectedPerson, deletePersonGiftIdea}) => {


  const unSaveIdea = () => {
    fetch(`http://localhost:3000/api/v1/person_gift_ideas/${id}`, {method: "DELETE"})
    .then(resp => {
      deletePersonGiftIdea(id, selectedPerson.id)
    })
  }

  return (
    <Card>
      <h3>{gift.name}</h3>
      <div onClick={unSaveIdea}>heart</div>
    </Card>
  );

}


function mapDispatchToProps(dispatch) {
  return {
    deletePersonGiftIdea: (pgi_id, person_id) => {dispatch({type: "DELETE_PERSON_GIFT_IDEA", payload: {person_id: person_id, pgi_id: pgi_id} } )}

  }
}

export default connect(null, mapDispatchToProps)(PersonSavedGift);
