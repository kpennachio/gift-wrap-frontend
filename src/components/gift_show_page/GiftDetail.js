import React from 'react';
import { connect } from 'react-redux'
import uuid from 'uuid'

import EditGiftForm from './EditGiftForm'
import GiftHistoryCard from './GiftHistoryCard'
import PersonSaveForm from './PersonSaveForm'
import EventSaveForm from './EventSaveForm'

import { Button, Dropdown } from 'semantic-ui-react'

import { resetState } from '../../resetState'



const GiftDetail = (props) => {

  const { gift, history, currentUser, people, deleteGift } = props

  // const renderPersonGiftIdeas = () => {
  //     return gift.person_gift_ideas.map(person_gift_idea => {
  //       let gift = gifts.find(gift => gift.id === person_gift_idea.gift_idea_id)
  //       if (gift) {
  //         return <PersonSavedGift key={uuid()} id={person_gift_idea.id} gift={gift} selectedGift={gift}/>
  //       }
  //     })
  // }
  //
  // const renderGiftsNeeded = () => {
  //   let pges = gift.person_gift_events.filter(pge => pge.gift === null)
  //   return pges.map(pge => {
  //     return <EventCard key={uuid()} event={pge.event} gift={gift} pge={pge}/>
  //   })
  // }
  //
  const renderGiftHistory = () => {
    if (gift.person_gift_events.length > 0){
      return gift.person_gift_events.map(pge => {
        return <GiftHistoryCard key={uuid()} event={pge.event} person={pge.person} gift={gift} pge={pge}/>
      })
    }
    else {
      return "You have not given this gift before!"
    }
  }

  const handleDeleteGift = () => {
    console.log("deleting");
    fetch(`http://localhost:3000/api/v1/gifts/${gift.id}`, {
      method: "DELETE"
    })
    .then(resp => {
      resetState(currentUser.id)
      history.push(`/my-gifts`)
      deleteGift(gift.id)

    })
  }




  return (
    <div>
      <h1>{gift.name}</h1>
      <img src={gift.image} alt={gift.name}/>
      <p>Store: {gift.store}</p>
      <p>List Price: {gift.list_price}</p>
      <a href={gift.link}>Store Link</a>
      <p>Notes:</p>
      <p>{gift.notes !== null ? gift.notes : "Add notes..."}</p>
      <h2>Gift History</h2>
      {renderGiftHistory()}
      <h2>Save to Person</h2>
      <PersonSaveForm gift={gift}/>
      <h2>Save to Event</h2>
      <EventSaveForm gift={gift}/>
      <EditGiftForm gift={gift}/>
      <Button onClick={handleDeleteGift}>Delete Gift</Button>
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
    deleteGift: (giftId) => dispatch({type: "DELETE_GIFT", payload: giftId})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GiftDetail);
