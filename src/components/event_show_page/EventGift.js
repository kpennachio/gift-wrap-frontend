import React from 'react';
import { connect } from 'react-redux'

import { Card, Button, Image, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import { resetState } from '../../resetState'
import { slugify } from '../../slug'

// Event Show Page: one gift (styled as Semantic card)

const EventGift = (props) => {

  const {gift, event, selectedPerson, addNewPersonGiftIdea, addNewEventGiftIdea, pge, editPersonGiftEvent, people, gifts, currentUser, url, deletePersonGiftIdea, deleteEventGiftIdea, changePersonGiftEvent} = props


  // ############# Saving and Unsaving a Gift Idea for a Person ##################

  const handlePersonClick = () => {
    if (gift.person_gift_ideas.find(pgi => pgi.person_id === selectedPerson.id)) {
      let pgi = gift.person_gift_ideas.find(pgi => pgi.person_id === selectedPerson.id)
      unSavePersonIdea(pgi.id)
    }
    else saveIdeaPerson()
  }

  const unSavePersonIdea = (id) => {
    fetch(`${url}/person_gift_ideas/${id}`, {method: "DELETE"})
    .then(resp => {
      deletePersonGiftIdea(id, selectedPerson.id)
      resetState(currentUser.id)
    })
  }

  const saveIdeaPerson = () => {
    let data = {
      person_id: selectedPerson.id,
      gift_idea_id: gift.id
    }
    fetch(`${url}/person_gift_ideas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(resp => resp.json())
    .then(pgi => {
      addNewPersonGiftIdea(pgi)
      resetState(currentUser.id)
    })
  }


// ############# Saving and Unsaving a Gift Idea for Event ##################

  const handleEventClick = () => {
    if (gift.event_gift_ideas.find(egi => egi.event_id === event.id)) {
      let egi = gift.event_gift_ideas.find(egi => egi.event_id === event.id)
      unSaveEventIdea(egi.id)
    }
    else saveIdeaEvent()

  }

  const unSaveEventIdea = (id) => {
    fetch(`${url}/event_gift_ideas/${id}`, {method: "DELETE"})
    .then(resp => {
      deleteEventGiftIdea(id, event.id)
      resetState(currentUser.id)
    })
  }


  const saveIdeaEvent = () => {
    let data = {
      event_id: event.id,
      gift_idea_id: gift.id
    }
    fetch(`${url}/event_gift_ideas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(resp => resp.json())
    .then(egi => {
      addNewEventGiftIdea(egi)
      resetState(currentUser.id)

    })
  }


  //########### Selecting and Unselecting gift for a person ###############

  const selectGift = () => {
    let data = {
      gift_id: gift.id,
      gift_actual_cost: gift.list_price
    }

    fetch(`${url}/person_gift_events/${pge.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(resp => resp.json())
    .then(pge => {
      pge.person = people.find(person => person.id === pge.person_id)
      pge.gift = gifts.find(gift => gift.id === pge.gift_id)

      changePersonGiftEvent(pge)
      editPersonGiftEvent(pge)
      resetState(currentUser.id)
    })
  }

  const removeGift = () => {
    let data = {
      gift_id: null,
      gift_actual_cost: 0
    }
    fetch(`${url}/person_gift_events/${pge.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(resp => resp.json())
    .then(pge => {
      pge.person = people.find(person => person.id === pge.person_id)
      pge.gift = null
      changePersonGiftEvent(pge)
      editPersonGiftEvent(pge)
      resetState(currentUser.id)
    })
  }


  // ############# Buttons on Gift Card #####################################

  // Determines if gift will have "Saved to [Person]" heart
  const savePersonHeart = () => {
    // does gift have person_gift_ideas?
    // does the person_gift_idea match the person_id of the selected person?
    if (gift.person_gift_ideas.find(pgi => pgi.person_id === selectedPerson.id)) {
      return (
        <div className="heart-container">
          <Icon name="heart" className="event-page" size="large" onClick={handlePersonClick} />{`Saved to ${selectedPerson.name}`}
        </div>
    )}
    else return (
      <div className="heart-container">
        <Icon name="heart outline" className="event-page" size="large" onClick={handlePersonClick} />{`Save to ${selectedPerson.name}`}
      </div>
    )
  }

  // Determines if gift will have "Saved to Event" heart
  const saveEventHeart = () => {
    // does gift have event_gift_ideas?
    // does the event_gift_idea match the event_id of the event?
    if (gift.event_gift_ideas.find(egi => egi.event_id === event.id)) {
      return (
        <div className="heart-container">
          <Icon name="heart" className="event-page" size="large" onClick={handleEventClick} />Saved to Event
        </div>
    )}
    else return (
      <div className="heart-container">
        <Icon name="heart outline" className="event-page" size="large" onClick={handleEventClick} />Save to Event
      </div>
    )
  }

  // Determines if gift button will say select or unselect gift for a person
  const renderSelectButton = () => {
    if (pge.gift) {
      if (pge.gift.id === gift.id) {
        return <Button className="unselect-gift" onClick={removeGift}>Unselect Gift!</Button>
      }
    }
    return <Button onClick={selectGift}>{`Select this gift for ${selectedPerson.name}`}</Button>
  }

  return (
    <Card
      className="gift"
    >
      <Card.Content>
      <Card.Header className="gift-name">{gift.name}</Card.Header>
      <Card.Meta>{gift.store} ${parseInt(gift.list_price).toFixed(2)}</Card.Meta>
      <div className="image-container" >
      <Image as={Link} to={`/my-gifts/${slugify(gift.name)}`} src={gift.image}
      alt={gift.name} id="gift-idea"/>
      </div>
      </Card.Content>

      <Card.Content extra>
        <div className="button-content">
            {saveEventHeart()}
            {savePersonHeart()}
            {renderSelectButton()}
        </div>
      </Card.Content>

    </Card>

  );

}



function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    people: state.people,
    gifts: state.gifts,
    url: state.url
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addNewPersonGiftIdea: (pgi) => {dispatch({type: "ADD_NEW_PERSON_GIFT_IDEA", payload: {person_id: pgi.person_id, pgi: pgi} } )},
    addNewEventGiftIdea: (egi) => {dispatch({type: "ADD_NEW_EVENT_GIFT_IDEA", payload: {event_id: egi.event_id, egi: egi}})},
    deletePersonGiftIdea: (pgi_id, person_id) => {dispatch({type: "DELETE_PERSON_GIFT_IDEA", payload: {person_id: person_id, pgi_id: pgi_id} } )},
    deleteEventGiftIdea: (egi_id, event_id) => {dispatch({type: "DELETE_EVENT_GIFT_IDEA", payload: {event_id: event_id, egi_id: egi_id} } )},
    editPersonGiftEvent: (pge) => {dispatch({type: "EDIT_PERSON_GIFT_EVENT", payload: pge})}

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventGift);
