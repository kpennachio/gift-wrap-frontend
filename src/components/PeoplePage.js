import React from 'react';
import { connect } from 'react-redux'



const PeoplePage = (props) => {

  return (
    <div>
      <h1>My People Page</h1>
    </div>
  );

}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(PeoplePage);
