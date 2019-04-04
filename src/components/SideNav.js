import React, { Component } from 'react';
import { Sidebar, Menu } from 'semantic-ui-react'



export default class SideNav extends Component {

  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state
    return (
      <div className="menu-wrapper">
      <Sidebar as={Menu} vertical visible width="thin" className="vertical-menu" >
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
        </Sidebar>
      </div>
    )
  }

}
