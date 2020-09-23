import React, { Component } from "react";

import { Header, Icon, Image, Menu, Segment, Sidebar } from "semantic-ui-react";

class SidebarExampleVisible extends Component {
  render() {
    return (
      <Sidebar
        as={Menu}
        animation="push"
        icon="labeled"
        inverted
        vertical
        visible={true}
        width="thin"
      >
        <Menu.Item as="a" onClick={() => this.props.functions.switchToHistory(false)}>
          <Icon name="home" />
          Home
        </Menu.Item>
        <Menu.Item as="a" onClick={() => this.props.functions.switchToHistory(true)}>
          <Icon name="history" />
          History
        </Menu.Item>
        <Menu.Item as="a" onClick={this.props.functions.logoutFn}>
          <Icon name="shutdown" />
          Logout
        </Menu.Item>
      </Sidebar>
    );
  }
}

export default SidebarExampleVisible;
