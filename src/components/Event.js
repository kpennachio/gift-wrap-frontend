import React from 'react';
import { connect } from 'react-redux'

import { Card } from 'semantic-ui-react'




const Event = ({event, people}) => {

  const renderPeople = () => {
    return people.map(person => <p>{person.name}</p>)
  }

  return (
    <div className="card-test">
    <Card>
      <h3>{event.title}</h3>
      <p>{event.dateFormatted}</p>
    </Card>

    </div>
  );

}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(Event);
