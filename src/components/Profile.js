import React, { Component } from 'react';
import { connect } from 'react-redux'


import ProfileForm from './ProfileForm'

// Profile Page: Account Settings > Edit Profile

class Profile extends Component {

  // Show edit user form with current user information
  renderForm = () => {
    if (this.props.currentUser.username) {
      return <ProfileForm user={this.props.currentUser} logout={this.props.logout} history={this.props.history}/>
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
