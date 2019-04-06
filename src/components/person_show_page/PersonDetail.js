import React from 'react';
import { connect } from 'react-redux'

import PersonSavedGift from '../person_show_page/PersonSavedGift'
import EventCard from './EventCard'




const PersonDetail = ({person, gifts}) => {

  const renderPersonGiftIdeas = () => {
      return person.person_gift_ideas.map(person_gift_idea => {
        let gift = gifts.find(gift => gift.id === person_gift_idea.gift_idea_id)
        if (gift) {
          return <PersonSavedGift key={gift.id} id={person_gift_idea.id} gift={gift} selectedPerson={person}/>
        }
      })
  }

  const renderGiftsNeeded = () => {
    let pges = person.person_gift_events.filter(pge => pge.gift === null)
    return pges.map(pge => {
      return <EventCard event={pge.event} person={person} pge={pge}/>
    })
  }

  const renderPastGifts = () => {
    let pges = person.person_gift_events.filter(pge => pge.gift !== null)
    return pges.map(pge => {
      return <EventCard event={pge.event} person={person} pge={pge}/>
    })
  }

  return (
    <div>
      <h1>{person.name}</h1>
      <h2>Notes:</h2>
      <p>{person.notes !== null ? person.notes : "Add notes..."}</p>
      <h2>{`Need gifts for ${person.name}`}</h2>
      {renderGiftsNeeded()}
      <h2>Saved Gifts</h2>
      {renderPersonGiftIdeas()}
      <h2>Gift History</h2>
      {renderPastGifts()}
    </div>
  );

}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    people: state.people,
    gifts: state.gifts
  }
}

export default connect(mapStateToProps)(PersonDetail);
