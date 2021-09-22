import React from "react";
import axios from "axios";

export default class MyApp extends React.Component {
  constructor(props) {
    super(props);
    this.input = "";
    this.state = {
      data: null,
      got_data: "Getting data...",
      error: false,
      input: "",
      name: "Example App"
    };
  }

  handleInput = event => {
    this.setState({ input: event.target.value });
    console.log(this.state.input);
  };

  getData() {
    console.log("Getting data...");
    axios
      .get("https://my-json-server.typicode.com/typicode/demo/posts/1")
      .then(response => this.setState({ data: response.data.title }));
    //console.log(respsonse)
    // this.setState({data: response.data})
    console.log("Got data!");
  }

  onClick = () => {
    this.getData();
    console.log(this.state.data);
  };

  updateName = () => {
    this.setState({ name: this.state.input });
  };

  createError = () => {
    // console.log(this.state.error)
    if (this.state.error) {
      this.setState({ error: false });
    } else {
      this.setState({ error: true });
    }
  };

  render() {
    if (this.state.error) {
      return (
        <div className="box">
          <h1>
            <span>{this.state.name}</span>
          </h1>
          <button onClick={this.onClick} class="button is-light">
            Get Data
          </button>
          <button onClick={this.createError} class="button is-dark">
            Remove Error
          </button>
          <button onClick={this.updateName} class="button is-light">
            Change App Name
          </button>
          <div>
            <span>Error detected!</span>
          </div>
        </div>
      );
    }
    return (
      <div className="box">
        <h1>
          <span>{this.state.name}</span>
        </h1>
        <button onClick={this.onClick} class="button is-light">
          Get Data
        </button>
        <button onClick={this.createError} class="button is-light">
          Create Error
        </button>
        <button onClick={this.updateName} class="button is-light">
          Change App Name
        </button>
        <div class="control">
          <input
            type="text"
            name="name-1"
            onChange={this.handleInput}
            class="input"
          />
        </div>
        <span />
      </div>
    );
  }
}
