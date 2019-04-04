import React from 'react';
import { connect } from 'react-redux'



const Budgeter = (props) => {

  return (
    <div>
      <h1>My Budgeter</h1>
    </div>
  );

}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(Budgeter);
