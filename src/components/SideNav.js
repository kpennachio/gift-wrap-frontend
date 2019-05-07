import React, { Component } from 'react';
import { Sidebar, Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

// Sidebar navigation

export default class SideNav extends Component {

  state = {
    activeItem: ""
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
  }

  render() {
    const { activeItem } = this.state
    return (
      <Sidebar as={Menu} vertical visible width="thin" className="vertical-menu" >
        <Menu.Item
          as={NavLink} to='/dashboard'
          name="Dashboard"
          active={activeItem === 'Dashboard'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          as={NavLink} to='/checklist'
          name="Checklist"
          active={activeItem === 'Checklist'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name="Budgeter"
          as={NavLink} to='/budgeter'
          active={activeItem === 'Budgeter'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name="People"
          as={NavLink} to='/my-people'
          active={activeItem === 'People'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name="Gifts"
          as={NavLink} to='/my-gifts'
          active={activeItem === 'Gifts'}
          onClick={this.handleItemClick}
        />
        </Sidebar>
    )
  }

}
