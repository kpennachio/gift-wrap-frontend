import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react'



export default class Header extends Component {

  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state
    console.log(activeItem);
    return (
      <div className="header">
      <Menu secondary>
        <Menu.Item
          name="giftWrap"
          context="Gift Wrap"
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name="planningTools"
          context="Planning Tools"
          active={activeItem === 'planningTools'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name="giftIdeas"
          context="Gift Ideas"
          active={activeItem === 'giftIdeas'}
          onClick={this.handleItemClick}
        />
        </Menu>
      </div>
    )
  }

}
