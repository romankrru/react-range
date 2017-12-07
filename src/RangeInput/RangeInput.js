import React from 'react';
import PropTypes from 'prop-types';

import './RangeInput.css';

class RangeInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      leftPos: 0,
    }
  }

  componentDidMount() {
    this.thumbCoord = this.thumb.getBoundingClientRect().left;
    this.rangeCoord = this.range.getBoundingClientRect().left;
    this.rangeWidth = this.range.offsetWidth;
    this.thumbWidth = this.thumb.offsetWidth;
    this.maxLeftPosValue = this.rangeWidth - this.thumbWidth;
    
    document.addEventListener('mouseup', this.documentMouseUpHandler);

    this.props.onValueChange({value: this.props.min});
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.documentMouseUpHandler);
    document.removeEventListener('mousemove', this.mouseMoveHandler);
  }

  normalizeValue = () => {
    const {min, max} = this.props;
    const percantage = this.state.leftPos / this.maxLeftPosValue;
    const value = ((max - min) * percantage) + min;

    return value;
  }

  documentMouseUpHandler = () => {
    document.removeEventListener('mousemove', this.mouseMoveHandler);
  }

  mouseMoveHandler = (e) => {
    let leftPos = e.pageX - this.offsetX - this.rangeCoord;

    if (leftPos < 0) {
      leftPos = 0;
    }

    if (leftPos > this.maxLeftPosValue) {
      leftPos = this.maxLeftPosValue;
    }

    this.setState({
      leftPos
    });

    const event = {
      value: this.normalizeValue()
    };

    this.props.onValueChange(event);
  }
  
  mouseDowmHandler = (e) => {
    document.addEventListener('mousemove', this.mouseMoveHandler);
    this.offsetX = e.pageX - this.thumb.getBoundingClientRect().left;
  }

  mouseUpHandler = () => {
    document.removeEventListener('mousemove', this.mouseMoveHandler);
  }
  
  render() {
    return (
      <div className="RangeInput" style={{ width: `${this.props.width}px` }} ref={(range) => this.range = range}>
        <div className="fill" style={{ width: `${this.state.leftPos}px` }}/>
        <div className="thumb"
          ref={(thumb) => this.thumb = thumb}
          onDragStart={(e)=> e.preventDefault()}
          onMouseDown={this.mouseDowmHandler}
          onMouseUp={this.mouseUpHandler}
          style={{left: `${this.state.leftPos}px`}}
        />
      </div>
    );
  }
}

RangeInput.defaultProps = {
  onValueChange: (e) => { },
  min: 0,
  max: 100,
  width: 300,
};

RangeInput.propTypes = {
  onValueChange: PropTypes.func,
  min: PropTypes.number,
  max: PropTypes.number,
  width: PropTypes.number,  
};

export default RangeInput;