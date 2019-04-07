import React from 'react';
import { connect } from 'react-redux'
import uuid from 'uuid'

import GiftCard from './GiftCard'
import GiftForm from './GiftForm'



const GiftPage = (props) => {

  const renderAllGifts = () => {
    return props.gifts.map(gift => {
      return <GiftCard key={uuid()} gift={gift} />
    })
  }

  return (
    <div>
      <h1>My Gift Page</h1>
      <GiftForm />
      {renderAllGifts()}

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
