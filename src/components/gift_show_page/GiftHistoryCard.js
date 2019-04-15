import React from 'react';
import { connect } from 'react-redux'

import { Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'


const GiftDetail = (props) => {

  const { event, person } = props
  console.log(event);
  return (
    <Card as={Link} to={`/checklist/${event.id}`} className="history-card">
      <p>{`You gave this gift to ${person.name}:`}</p>
      <p>{event.title}</p>
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
