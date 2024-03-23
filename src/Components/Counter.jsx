import React from "react";

class Counter extends React.Component {
  constructor() {
    super();
    this.state = {
      count: 0,
    };
  }

  increment = () => {
    this.setState((prevState) => ({
      ...prevState,
      count: prevState.count + 1,
    }));
  };

  render() {
    return (
      <div>
        <p>The Counter Value is {this.state.count}</p>
        <button className="btn btn-primary" onClick={this.increment}>
          Click to increment counter
        </button>
      </div>
    );
  }
}

export default Counter;
