import React from 'react';
import { connect } from 'react-redux'

import PersonCard from './PersonCard'
import PersonForm from './PersonForm'



const PeoplePage = (props) => {


  const renderAllPeople = () => {
    return props.people.map(person => {
      return <PersonCard key={person.id} person={person} />
    })
  }

  return (
    <div>
      <h1>My People Page</h1>
      {renderAllPeople()}
      <PersonForm />
    </div>
  );

}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    people: state.people
  }
}

export default connect(mapStateToProps)(PeoplePage);
