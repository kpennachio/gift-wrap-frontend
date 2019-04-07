import React from 'react';
import { connect } from 'react-redux'
import uuid from 'uuid'

import { Card, Grid } from 'semantic-ui-react'
import { Link } from 'react-router-dom'




const Event = ({event, pge}) => {

  const renderPeople = () => {
    return pge.map(pge => <p>{pge.person.name}</p>)
  }

  return (

    <Card
      fluid
      className="event"
      as={Link} to={`checklist/${event.id}`}
    >
      <Card.Header>
        <Grid>
          <Grid.Column width={5}><p>{event.dateFormatted}</p></Grid.Column>
          <Grid.Column width={4}><h3>{event.title}</h3></Grid.Column>
        </Grid>
      </Card.Header>
      {renderPeople()}
    </Card>

  );

}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(Event);
