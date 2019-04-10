import React, { Component } from 'react';
import { connect } from 'react-redux'


import ProfileForm from './ProfileForm'



class Profile extends Component {


  renderForm = () => {
    if (this.props.currentUser.username) {
      return <ProfileForm user={this.props.currentUser}/>
    }
  }

  render() {
    return (
      <div>
        <h1>Your Profile</h1>
        {this.renderForm()}
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(Profile);
