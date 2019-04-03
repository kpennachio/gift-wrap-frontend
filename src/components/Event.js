import React from 'react';
import { connect } from 'react-redux'

import { Card } from 'semantic-ui-react'




const Event = ({event}) => {


  return (
    <div class="card-test">
    <Card>
      <h3>{event.title}</h3>
      <p>{event.dateFormatted}</p>

    </Card>

    </div>
  );

}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(Event);
