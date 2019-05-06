import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import AppHeader from './AppHeader'


import { Form, Input, Button, Modal, Icon, Header } from 'semantic-ui-react'

// Edit user form -- on Profile page

class ProfileForm extends Component {

  state = {
    first_name: this.props.user.first_name,
    last_name:  this.props.user.last_name,
    showModal: false
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  // on submit, edit user in db
  handleSubmit = (e) => {
    this.updateUserInfo()
  }

  // update user in db
  updateUserInfo = () => {
    let data = {
      first_name: this.state.first_name,
      last_name:  this.state.last_name
    }
    fetch(`${this.props.url}/users/${this.props.currentUser.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(resp => resp.json())
    .then(console.log)
  }


  //######### Modal for delete user confirmation ############

  // Cancel button closes modal
  cancelDelete = () => {
    this.closeModal()
  }

  // Delete user from db
  deleteAccount = () => {
    fetch(`${this.props.url}/users/${this.props.currentUser.id}`, {
      method: "Delete"
    })
    .then(resp => {
      this.props.logout()
    })
  }

  closeModal = () => {
    this.setState({ showModal: false })
  }

  openModal = () => {
    this.setState({ showModal: true })
  }

  render() {
    return (
      <Fragment>
      <div>
        <AppHeader logout={this.props.logout}/>
        <div className="planner-content">
          <Form onSubmit={this.handleSubmit}>
            <Form.Field control={Input} value={this.state.first_name} name="first_name" label='First Name' placeholder='First Name' onChange={this.handleChange} />
            <Form.Field control={Input} value={this.state.last_name} name="last_name" label='Last Name' placeholder='Last Name' onChange={this.handleChange} />
            <Button type='submit'>Edit Person</Button>
          </Form>
        </div>
        </div>
        <div>
          <Modal
            onClose={this.closeModal}
            open={this.state.showModal}
            trigger={<Button onClick={() => this.setState({ showModal: true })}>Delete Account</Button>}
            size='small'>
            <Header icon='archive' content='Delete Account' />
            <Modal.Content>
              <p>
                Are you sure you would like to delete your account?
              </p>
            </Modal.Content>
            <Modal.Actions>
              <Button onClick={this.cancelDelete} color='red' inverted>
                <Icon name='remove' /> Cancel
              </Button>
              <Button onClick={this.deleteAccount} color='green' inverted>
                <Icon name='checkmark' /> Delete Account
              </Button>
            </Modal.Actions>
          </Modal>

      </div>
      </Fragment>
    )
  }

}


function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    url: state.url
  }
}

export default connect(mapStateToProps)(ProfileForm);
