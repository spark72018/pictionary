import React, { Component } from 'react';

export default class MakeUserName extends Component {
  state = {
    text: ''
  };

  handleChange = e => this.setState({ text: e.target.value });

  render() {
    const { text } = this.state;
    return (
      <form className="choose-name-form">
        <h4>Choose a username</h4>
        <input value={text} onChange={this.handleChange} />
        <button type="submit" onClick={e => this.props.handleSubmit(e, text)}>
          OK
        </button>
      </form>
    );
  }
}
