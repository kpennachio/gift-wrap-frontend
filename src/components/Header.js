import React, { Component } from 'react';
import { Menu, Dropdown } from 'semantic-ui-react'
import { NavLink, Link } from 'react-router-dom'



export default class Header extends Component {

  // state = {}
  //
  // handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    // const { activeItem } = this.state
    return (
      <div className="header">
      <Menu fixed="top" inverted size="massive">
        <Menu.Item
          name="giftWrap"
          context="Gift Wrap"
          onClick={this.handleItemClick}
        />
        <Menu.Item
          as={NavLink} to='/dashboard'
          name="planningTools"
          context="Planning Tools"
        />
        <Menu.Menu position="right">
          <Dropdown
            item
            text='Account Settings'
            as={Link} to='/account'
            >
            <Dropdown.Menu>
              <Dropdown.Item
                text='Edit Profile'
                as={Link} to='/account'
                />
              <Dropdown.Item
                text='Logout'
                as={Link} to='/login'
                />
            </Dropdown.Menu>
          </Dropdown >
        </Menu.Menu>

        </Menu>
      </div>
    )
  }

}


// active={activeItem === 'planningTools'}
// onClick={this.handleItemClick}
