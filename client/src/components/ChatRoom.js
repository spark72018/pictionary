import React, { Component } from 'react';
import Message from './Message';
import getTime from '../utilityFns/getTime';
import { ENTER_KEYCODE } from '../constants';

export default class ChatRoom extends Component {
  state = {
    msg: ''
  };

  chatRef = React.createRef();

  componentDidMount() {
    this.chatRef.current.scrollTop = 9999;
  }

  componentDidUpdate() {
    this.chatRef.current.scrollTop = 9999;
  }

  handleKeyDown = e => {
    if (e.keyCode === ENTER_KEYCODE) {
      this.props.socket.emit('send message', {
        msg: this.state.msg,
        time: getTime(),
        timeId: Date.now()
      });

      return this.setState({ msg: '' });
    }
  };

  handleChange = e => this.setState({ msg: e.target.value });

  makeMessageItems = (data, idx) => (
    <Message
      data={data}
      idx={idx}
      key={`message${idx}`}
      handleChatMessageClick={this.props.handleChatMessageClick}
    />
  );

  render() {
    const { msg } = this.state;
    const { msgs } = this.props;
    return (
      <div className="chat-container">
        <ul ref={this.chatRef} className="chat-messages">
          {msgs.map(this.makeMessageItems)}
        </ul>
        <input
          value={msg}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
        />
      </div>
    );
  }
}
