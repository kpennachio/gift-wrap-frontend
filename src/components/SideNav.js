import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react'



export default class SideNav extends Component {

  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state
    console.log(activeItem);
    return (
      <div className="menu-wrapper">
      <Menu secondary vertical className="vertical-menu">
        <Menu.Item
          name="Dashboard"
          active={activeItem === 'Dashboard'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name="Checklist"
          active={activeItem === 'Checklist'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name="Budgeter"
          active={activeItem === 'Budgeter'}
          onClick={this.handleItemClick}
        />
        </Menu>
      </div>
    )
  }

}
