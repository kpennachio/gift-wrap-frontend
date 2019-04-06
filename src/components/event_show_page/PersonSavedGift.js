import React from 'react';
import { connect } from 'react-redux'

import { Card, Button } from 'semantic-ui-react'




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
      <div onClick={unSaveIdea}>❤️</div>
      <Button>{`Select this gift for ${selectedPerson.name}`}</Button>
    </Card>
  );

}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}

function mapDispatchToProps(dispatch) {
  return {
    deletePersonGiftIdea: (pgi_id, person_id) => {dispatch({type: "DELETE_PERSON_GIFT_IDEA", payload: {person_id: person_id, pgi_id: pgi_id} } )}

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonSavedGift);