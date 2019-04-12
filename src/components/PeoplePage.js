import React from 'react';
import { connect } from 'react-redux'

import PersonCard from './PersonCard'
import PersonForm from './PersonForm'
import SideNav from './SideNav'
import Header from './Header'

import uuid from 'uuid'


const PeoplePage = (props) => {


  const renderAllPeople = () => {
    return props.people.map(person => {
      return <PersonCard key={uuid()} person={person} />
    })
  }

  return (
    <div>
      <Header logout={props.logout}/>

      <SideNav />
      <div className="planner-content">
        <h1>My People Page</h1>
        {renderAllPeople()}
        <PersonForm />
      </div>
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
