import React from 'react';
import { connect } from 'react-redux'

import GiftDetail from './GiftDetail'




const Gift = (props) => {

  const returnGift = () => {
    if (props.gifts.length > 0) {
      return < GiftDetail gift={props.gift} history={props.history} logout={props.logout}/>
    }
  }

  return (
    <div>
      {returnGift()}
    </div>
  );

}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    gifts: state.gifts
  }
}

export default connect(mapStateToProps)(Gift);
