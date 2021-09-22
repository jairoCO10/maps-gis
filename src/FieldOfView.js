import React from "react";
import { Polygon } from "react-leaflet";

export default class FOVMarker extends React.Component {
  state = {
    id: this.props.id,
    positions: this.props.positions
  };

  componentDidMount() {
    this.intervalID = setInterval(() => this.tick(), 300);
  }
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  tick() {
    this.setState({
      positions: this.state.positions
    });
  }

  render() {
    return <Polygon positions={this.state.positions} color="blue" />;
  }
}
