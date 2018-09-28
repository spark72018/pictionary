import React, { Component } from 'react';

// props: socket
export default class DrawingBoard extends Component {
  state = {
      drawing: false,
      currentColor: 'black'
  };

  canvasRef = React.createRef();

  render() {
    return <canvas ref={this.canvasRef} width={400} height={400} />;
  }
}
