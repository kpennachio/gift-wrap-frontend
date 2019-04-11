import React, { Component } from 'react';
import { Menu, Dropdown } from 'semantic-ui-react'
import { Link } from 'react-router-dom'



export default class Header extends Component {

  render() {
    return (
      <div className="header">
      <Menu fixed="top" inverted size="massive">
        <Menu.Item
          name="giftWrap"
          context="Gift Wrap"
          onClick={this.handleItemClick}
        />
        <Menu.Item
          as={Link} to='/dashboard'
          name="planningTools"
          context="Planning Tools"
        />
        <Menu.Menu position="right">
          <Dropdown
            item
            text='Account Settings'
            >
            <Dropdown.Menu>
              <Dropdown.Item
                text='Edit Profile'
                as={Link} to='/account'
                />
              <Dropdown.Item
                text='Logout'
                onClick={this.props.logout}
                />
            </Dropdown.Menu>
          </Dropdown >
        </Menu.Menu>

        </Menu>
      </div>
    )
  }

}
