import React, { Component } from 'react';
import Message from './Message';
import getTime from '../utilityFns/getTime';
import { ENTER_KEYCODE } from '../constants';

export default class ChatRoom extends Component {
  state = {
    msg: ''
  };

  handleKeyDown = e => {
    if (e.keyCode === ENTER_KEYCODE) {
      console.log('enter pressed');
      this.props.socket.emit('send message', {
        msg: this.state.msg,
        time: getTime()
      });

      return this.setState({ msg: '' });
    }
  };

  handleChange = e => this.setState({ msg: e.target.value });

  makeMessageItems = (data, idx) => (
    <Message data={data} key={`message${idx}`} />
  );

  render() {
    const { msg } = this.state;
    const { msgs } = this.props;
    return (
      <div className="chat-container">
        <ul className="chat-messages">{msgs.map(this.makeMessageItems)}</ul>
        <input
          value={msg}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
        />
      </div>
    );
  }
}
