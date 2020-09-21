import React, { Component } from 'react'

import { Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react'


class SidebarExampleVisible extends Component{
  render(){
    return(
      <Sidebar
      as={Menu}
      animation='push'
      icon='labeled'
      inverted
      vertical
      visible={true}
      width='thin'
    >
      <Menu.Item as='a'>
        <Icon name='home' />
        Home
      </Menu.Item>
      <Menu.Item as='a'>
        <Icon name='history' />
        History
      </Menu.Item>
      <Menu.Item as='a'>
        <Icon name='shutdown' />
        Logout
      </Menu.Item>
    </Sidebar>
    )
  }
}


export default SidebarExampleVisible