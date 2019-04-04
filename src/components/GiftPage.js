import React from 'react';
import { connect } from 'react-redux'



const GiftPage = (props) => {

  return (
    <div>
      <h1>My Gift Page</h1>
    </div>
  );

}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(GiftPage);
