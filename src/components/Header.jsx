import  { Component } from "react";

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      count: 0,
      text: "Salom",
    };
  }
  handleClick = () => {
    alert("Hello");
  };
  render() {
    return (
      <div>
        <h3>{this.state.text}</h3>
        <h2 className="">Header - {this.state.count} </h2>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Increment
        </button>
        <button
          disabled={this.state.count <= 0}
          onClick={() => this.setState({ count: this.state.count - 1 })}
        >
          Deccrement
        </button>
        <button onClick={() => this.setState({ text: "Hello" })}>Text</button>
        <button onClick={this.handleClick}>Click</button>
      </div>
    );
  }
}
