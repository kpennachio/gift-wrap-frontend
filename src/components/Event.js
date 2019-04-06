import React from 'react';
import { connect } from 'react-redux'

import { Card, Grid } from 'semantic-ui-react'




const Event = ({event, pge}) => {

  const renderPeople = () => {
    return pge.map(pge => <p>{pge.person.name}</p>)
  }

  return (

    <Card fluid className="event">
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
