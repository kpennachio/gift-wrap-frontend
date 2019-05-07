import React from 'react';
import { connect } from 'react-redux'

import { Card, Grid, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'


// Event detail on Checklist page
// Event title with date and checkmark showing if gifts are complete

const Event = ({event, pge}) => {


  const renderCheck = () => {
    if (pge.some(pge => pge.gift === null)) {
      return (
        <Icon size="big" className="unchecked inline" name="check circle outline" />
      )
    }
    else return (
      <Icon size="big" className="checked inline" name="check circle outline" />
    )
  }



  return (

    <Card
      fluid
      className="event"
      as={Link} to={`checklist/${event.id}`}
    >
      <Card.Header>
        <Grid>
          <Grid.Column width={3}>{renderCheck()}</Grid.Column>
          <Grid.Column width={7}><h3>{event.title}</h3></Grid.Column>
          <Grid.Column width={5}><p>{event.dateFormatted}</p></Grid.Column>
        </Grid>
      </Card.Header>
    </Card>

  );

}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(Event);
