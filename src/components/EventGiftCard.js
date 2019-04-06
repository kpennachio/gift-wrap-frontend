import React, { Fragment } from 'react';
import { connect } from 'react-redux'

import { Card, Button } from 'semantic-ui-react'




const EventGiftCard = ({gift, status, selectedPerson}) => {

  const renderButtons = () => {
    if (status === "all") {
      return(
        <Fragment>
        <Button>Save idea for event</Button>
        <Button>{`Save idea for ${selectedPerson.name}`}</Button>
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
