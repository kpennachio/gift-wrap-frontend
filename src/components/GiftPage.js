import React, { Component } from 'react';
import { connect } from 'react-redux'
import uuid from 'uuid'

import GiftCard from './GiftCard'
import GiftForm from './GiftForm'
import SideNav from './SideNav'
import Header from './Header'

import { Card, Sidebar, Menu, Button, Segment } from 'semantic-ui-react'



class GiftPage extends Component {

  state ={
    showForm: false
  }

  renderAllGifts = () => {
    return this.props.gifts.map(gift => {
      return <GiftCard key={uuid()} gift={gift} />
    })
  }

  showForm = () => {
    this.setState({showForm: true})
  }

  handleSidebarHide = () => {
    this.setState({showForm: false})
  }

  render() {
    return (
      <div>
      <Sidebar.Pushable>
      <Sidebar
      as={Menu}
      animation="overlay"
      vertical
      visible={this.state.showForm}
      direction="right"
      width="very wide"
      className="form"
      onHide={this.handleSidebarHide}
      >
      <GiftForm />
      </Sidebar>


      <Sidebar.Pusher dimmed={this.state.showForm} >

          <div className="container" >
          <Segment basic >
          <Header logout={this.props.logout}/>
          <SideNav />
          <div className="planner-content" >
            <h1>My Gift Page</h1>
            <Button onClick={this.showForm}>Add Gift</Button>
            <Card.Group>
            {this.renderAllGifts()}
            </Card.Group>
          </div>
          </Segment>
          </div>

      </Sidebar.Pusher>
      </Sidebar.Pushable>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    gifts: state.gifts
  }
}

export default connect(mapStateToProps)(GiftPage);
