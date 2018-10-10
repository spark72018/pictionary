import React, { Component } from 'react';
import throttle from '../utilityFns/throttle';
import { DEFAULT_COLOR } from '../constants';

export default class DrawingBoard extends Component {
  canvasRef = React.createRef();

  componentDidMount() {
    const { socket, handleDrawing } = this.props;
    const canvas = this.canvasRef.current;

    socket.on('clearBoard', this.clearBoard);
    return socket.on('drawing', data => this.handleDrawing(data, canvas));
  }

  handleDrawing = data => {
    const canvas = this.canvasRef.current;
    const w = canvas.width;
    const h = canvas.height;

    this.props.drawLine(
      data.x0 * w,
      data.y0 * h,
      data.x1 * w,
      data.y1 * h,
      data.color,
      false,
      canvas
    );
  };

  clearBoard = () => {
    const canvas = this.canvasRef.current;
    const context = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.width;

    return context.clearRect(0, 0, w, h);
  };

  // EMIT THE CLEARED BOARD TO EVERYONE ELSE TOO
  handleClearBoardClick = () => {
    if (!this.props.isDrawer) return;

    this.props.socket.emit('clearBoard');

    return this.clearBoard();
  };

  throttled = throttle(this.props.handleMouseMove, 10);

  render() {
    const {
      handleMouseMove,
      handleMouseDown,
      handleMouseUp,
      handleMouseOut
    } = this.props;
    const { current: canvas } = this.canvasRef;

    return (
      <div className="canvas-container">
        <canvas
          onMouseMove={e => this.throttled(e, canvas)}
          onMouseUp={e => handleMouseUp(e, canvas)}
          onMouseDown={handleMouseDown}
          onMouseOut={e => handleMouseOut(e, canvas)}
          ref={this.canvasRef}
          width={450}
          height={450}
          style={{ border: '1px solid #000000' }}
        />
        <button onClick={this.handleClearBoardClick}>Clear Board</button>
      </div>
    );
  }
}
