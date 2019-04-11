import React from 'react';
import { connect } from 'react-redux'

import GiftDetail from './GiftDetail'
import SideNav from '../SideNav'




const Gift = (props) => {

  const returnGift = () => {
    if (props.gifts.length > 0) {
      let gift = props.gifts.find(gift => gift.id === parseInt(props.match.params.id))
      return < GiftDetail gift={gift} history={props.history} />
    }
  }

  return (
    <div>
      <SideNav />
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
