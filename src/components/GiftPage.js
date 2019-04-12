import React from 'react';
import { connect } from 'react-redux'
import uuid from 'uuid'

import GiftCard from './GiftCard'
import GiftForm from './GiftForm'
import SideNav from './SideNav'
import Header from './Header'

import { Card } from 'semantic-ui-react'



const GiftPage = (props) => {

  const renderAllGifts = () => {
    return props.gifts.map(gift => {
      return <GiftCard key={uuid()} gift={gift} />
    })
  }

  return (
    <div>
      <Header logout={props.logout}/>
      <SideNav />
      <div className="planner-content">
        <h1>My Gift Page</h1>
        <GiftForm />
        <Card.Group>
          {renderAllGifts()}
        </Card.Group>
      </div>
    </div>
  );

}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    gifts: state.gifts
  }
}

export default connect(mapStateToProps)(GiftPage);
