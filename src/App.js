import React, { Component } from 'react';

import RangeInput from './RangeInput/RangeInput';

class App extends Component {
  state = {
    value: 1000,
  }

  render() {
    return (
      <div className="App">
        <RangeInput
          width={200}
          min={1000}
          max={2000}
          onValueChange={(e) => this.setState({value: e.value})}
        />
        <p style={{fontWeight: 'bold'}}>
          {this.state.value.toFixed(0)}
        </p>
      </div>
    );
  }
}

export default App;
