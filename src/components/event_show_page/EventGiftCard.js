import React, { Fragment } from 'react';
import { connect } from 'react-redux'

import { Card, Button } from 'semantic-ui-react'




const EventGiftCard = ({id, gift, status, selectedPerson, addNewPersonGiftIdea, deletePersonGiftIdea}) => {


  const saveIdea = () => {
    let data = {
      person_id: selectedPerson.id,
      gift_idea_id: gift.id
    }
    fetch("http://localhost:3000/api/v1/person_gift_ideas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(resp => resp.json())
    .then(pgi => {
      addNewPersonGiftIdea(pgi)
    })
  }

  const unSaveIdea = () => {
    fetch(`http://localhost:3000/api/v1/person_gift_ideas/${id}`, {method: "DELETE"})
    .then(resp => {
      deletePersonGiftIdea(id, selectedPerson.id)
    })
  }


  const renderButtons = () => {
    if (status === "other") {
      return(
        <Fragment>
        <Button>Save idea for event</Button>
        <Button onClick={saveIdea}>{`Save idea for ${selectedPerson.name}`}</Button>
        <Button>{`Select this gift for ${selectedPerson.name}`}</Button>
        </Fragment>
      )
    }
    if (status === "saved_person") {
      return(
        <Fragment>
        <div onClick={unSaveIdea}>❤️</div>
        <Button>{`Select this gift for ${selectedPerson.name}`}</Button>
        </Fragment>
      )
    }
  }

  return (
    <Card>
      <h3>{gift.name}</h3>
      {renderButtons()}
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
    addNewPersonGiftIdea: (pgi) => {dispatch({type: "ADD_NEW_PERSON_GIFT_IDEA", payload: {person_id: pgi.person_id, pgi: pgi} } )},
    deletePersonGiftIdea: (pgi_id, person_id) => {dispatch({type: "DELETE_PERSON_GIFT_IDEA", payload: {person_id: person_id, pgi_id: pgi_id} } )}

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventGiftCard);
