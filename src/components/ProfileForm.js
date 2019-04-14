import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import AppHeader from './AppHeader'


import { Form, Input, Button, Modal, Icon, Header } from 'semantic-ui-react'



class ProfileForm extends Component {

  state = {
    first_name: this.props.user.first_name,
    last_name:  this.props.user.last_name,
    showModal: false
  }


  cancelDelete = () => {
    this.closeModal()
  }

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
        <Header logout={this.props.logout}/>

        <Form>
          <Form.Field control={Input} value={this.state.first_name} name="first_name" label='First Name' placeholder='First Name' onChange={this.handleChange} />
          <Form.Field control={Input} value={this.state.last_name} name="last_name" label='Last Name' placeholder='Last Name' onChange={this.handleChange} />
          <Button type='submit'>Edit Person</Button>
        </Form>
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
