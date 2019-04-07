import React from 'react';
import { connect } from 'react-redux'

import { Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'


const GiftDetail = (props) => {

  const { event, person, currentUser } = props

  return (
    <Card as={Link} to={`/checklist/${event.id}`}>
      <h3>{`You gave this gift to ${person.name} for`}</h3>
      <h3>{event.title}</h3>
      <p>{event.date}</p>

    </Card>
  );

}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    people: state.people,
    gifts: state.gifts,
    user_id: state.user_id
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GiftDetail);
