import React from 'react';
import { connect } from 'react-redux'

import PersonSavedGift from '../person_show_page/PersonSavedGift'




const PersonDetail = ({person, gifts}) => {

  const renderPersonGiftIdeas = () => {
      return person.person_gift_ideas.map(person_gift_idea => {
        let gift = gifts.find(gift => gift.id === person_gift_idea.gift_idea_id)
        if (gift) {
          return <PersonSavedGift key={gift.id} id={person_gift_idea.id} gift={gift} selectedPerson={person}/>
        }
      })
  }

  return (
    <div>
      <h1>{person.name}</h1>
      <h2>{`Saved gifts for ${person.name}`}</h2>
      {renderPersonGiftIdeas()}
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
