import React from 'react';
import { connect } from 'react-redux'


const EventContainer = (props) => {

  console.log("event container", props.users);
  return (
    <div>
      Event Container Test
      {props.test}
    </div>
  );

}

function mapStateToProps(state) {
  return {
    test: state.test,
    users: state.users
  }
}

export default connect(mapStateToProps)(EventContainer);
