import React from 'react';
import { connect } from 'react-redux'

import { Card, Image, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import { resetState } from '../../resetState'

// Person show page: render saved gifts for person

const PersonSavedGift = ({id, gift, selectedPerson, deletePersonGiftIdea, currentUser, url}) => {

  // if heart is clicked, unsave gift in db
  const unSaveIdea = () => {
    fetch(`${url}/person_gift_ideas/${id}`, {method: "DELETE"})
    .then(resp => {
      deletePersonGiftIdea(id, selectedPerson.id)
      resetState(currentUser.id)
    })
  }

  return (
    <Card className="person-gift">
      <Card.Header className="inline" >
        <Link to={`/my-gifts/${gift.id}`} className="inline">{gift.name}</Link>
        <Icon name="heart" size="large" onClick={unSaveIdea} />
      </Card.Header>
      <Card.Content>
        <Link to={`/my-gifts/${gift.id}`}>
          <Image className="gift" src={gift.image} alt={gift.name} />
        </Link>
      </Card.Content>
    </Card>
  );

}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    url: state.url
  }
}

function mapDispatchToProps(dispatch) {
  return {
    deletePersonGiftIdea: (pgi_id, person_id) => {dispatch({type: "DELETE_PERSON_GIFT_IDEA", payload: {person_id: person_id, pgi_id: pgi_id} } )}

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonSavedGift);
