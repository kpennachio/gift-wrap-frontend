import React, { Fragment } from 'react';
import { connect } from 'react-redux'

import { Card, Button } from 'semantic-ui-react'




const EventGiftCard = ({gift, status, selectedPerson}) => {


  const saveIdea = () => {
    console.log("save idea");
    let data = {
      person_id: selectedPerson.id,
      gift_idea_id: gift.id
    }
    console.log(data);
    // fetch("http://localhost:3000/api/v1/person_gift_ideas", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Accept": "application/json"
    //   },
    //   body: JSON.stringify(data)
    // })
    // .then(resp => resp.json())
    // .then(pgi => {
    //   console.log(pgi);
    // })
  }

  const unSaveIdea = () => {
    console.log("unsave");
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
        <Button>Move to saved event ideas</Button>
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

export default connect(mapStateToProps)(EventGiftCard);
