import React, { Component } from 'react';

export default class GameRoom extends Component {
  state = {
    msg: ''
  };

  handleChange = e => this.setState({ msg: e.target.value });

  render() {
    const { msg } = this.state;
    return (
      <div className="game-room">
        <input value={msg} onChange={this.handleChange} />
      </div>
    );
  }
}
