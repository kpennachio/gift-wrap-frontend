import React from 'react';
import { connect } from 'react-redux'



const Dashboard = (props) => {

  return (
    <div>
      <h1>My Dashboard</h1>
    </div>
  );

}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(Dashboard);
