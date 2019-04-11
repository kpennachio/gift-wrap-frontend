import React from 'react';
import { connect } from 'react-redux'
import uuid from 'uuid'

import PersonSavedGift from '../person_show_page/PersonSavedGift'
import EventCard from './EventCard'
import EditPersonForm from './EditPersonForm'
import SideNav from '../SideNav'


import { Button } from 'semantic-ui-react'

import { resetState } from '../../resetState'



const PersonDetail = (props) => {

  const { person, gifts, history, deletePerson, currentUser } = props

  const renderPersonGiftIdeas = () => {
      return person.person_gift_ideas.map(person_gift_idea => {
        let gift = gifts.find(gift => gift.id === person_gift_idea.gift_idea_id)
        if (gift) {
          return <PersonSavedGift key={uuid()} id={person_gift_idea.id} gift={gift} selectedPerson={person}/>
        }
      })
  }

  const renderGiftsNeeded = () => {
    let pges = person.person_gift_events.filter(pge => pge.gift === null)
    return pges.map(pge => {
      return <EventCard key={uuid()} event={pge.event} person={person} pge={pge}/>
    })
  }

  const renderPastGifts = () => {
    let pges = person.person_gift_events.filter(pge => pge.gift !== null)
    return pges.map(pge => {
      return <EventCard key={uuid()} event={pge.event} person={person} pge={pge}/>
    })
  }

  const handleDeletePerson = () => {
    console.log("deleting");
    fetch(`http://localhost:3000/api/v1/people/${person.id}`, {
      method: "DELETE"
    })
    .then(resp => {
      resetState(currentUser.id)
      history.push(`/my-people`)
      deletePerson(person.id)

    })
  }


  return (
    <div>
      <SideNav />
      <h1>{person.name}</h1>
      <h2>Notes:</h2>
      <p>{person.notes !== null ? person.notes : "Add notes..."}</p>
      <h2>{`Need gifts for ${person.name}`}</h2>
      {renderGiftsNeeded()}
      <h2>Saved Gifts</h2>
      {renderPersonGiftIdeas()}
      <h2>Gift History</h2>
      {renderPastGifts()}
      <EditPersonForm person={person}/>
      <Button onClick={handleDeletePerson}>Delete Person</Button>
    </div>
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
    deletePerson: (personId) => dispatch({type: "DELETE_PERSON", payload: personId})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonDetail);
