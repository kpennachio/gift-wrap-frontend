import React from 'react';
import { connect } from 'react-redux'

import Gift from './Gift'



const GiftPage = (props) => {

  const renderAllGifts = () => {
    return props.gifts.map(gift => {
      return <Gift key={gift.id} gift={gift} />
    })
  }

  return (
    <div>
      <h1>My Gift Page</h1>
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
