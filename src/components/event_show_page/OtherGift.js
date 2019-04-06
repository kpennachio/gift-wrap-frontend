import React from 'react';
import { connect } from 'react-redux'

import { Card, Button } from 'semantic-ui-react'




const OtherGift = ({gift, selectedPerson, addNewPersonGiftIdea}) => {


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


  return (
    <Card>
      <h3>{gift.name}</h3>
      <Button>Save idea for event</Button>
      <Button onClick={saveIdea}>{`Save idea for ${selectedPerson.name}`}</Button>
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
    addNewPersonGiftIdea: (pgi) => {dispatch({type: "ADD_NEW_PERSON_GIFT_IDEA", payload: {person_id: pgi.person_id, pgi: pgi} } )},


  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OtherGift);
