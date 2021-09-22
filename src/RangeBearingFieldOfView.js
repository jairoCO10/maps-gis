import React from "react";
import { Polygon } from "react-leaflet";

export default class RangeBearingFOVMarker extends React.Component {
  state = {
    id: this.props.id,
    //54.820681,
    centre_position: this.props.centre_position,
    bearing: this.props.bearing,
    range: this.props.range,
    fov: this.props.fov,
    positions: [[54.877, -4.872], [54.8155, -4.73551], [54.8155, -4.63551]]
  };

  componentDidMount() {
    this.intervalID = setInterval(() => this.tick(), 300);
  }
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  // Add rotation form bearing
  convertRangeBearingToPolygon() {
    var centre_lat = this.state.centre_position[0];
    var centre_lng = this.state.centre_position[1];
    var range = this.state.range / 11111;
    var bearing = -1 * this.state.bearing;
    var base = (range * ((Math.tan(this.state.fov) * Math.PI) / 180)) / 2;

    var x_a = centre_lng + base;
    var y_a = centre_lat + range;

    var x_b = centre_lng - base;
    var y_b = centre_lat + range;

    var new_x_a =
      centre_lng +
      (x_a - centre_lng) * ((Math.cos(bearing) * Math.PI) / 180) -
      (y_a - centre_lat) * ((Math.sin(bearing) * Math.PI) / 180);
    var new_y_a =
      centre_lat +
      (x_a - centre_lng) * ((Math.sin(bearing) * Math.PI) / 180) +
      (y_a - centre_lat) * ((Math.cos(bearing) * Math.PI) / 180);

    var new_x_b =
      centre_lng +
      (x_b - centre_lng) * ((Math.cos(bearing) * Math.PI) / 180) -
      (y_b - centre_lat) * ((Math.sin(bearing) * Math.PI) / 180);
    var new_y_b =
      centre_lat +
      (x_b - centre_lng) * ((Math.sin(bearing) * Math.PI) / 180) +
      (y_b - centre_lat) * ((Math.cos(bearing) * Math.PI) / 180);

    var pologon = [];
    pologon.push([centre_lat, centre_lng]);
    pologon.push([new_y_a, new_x_a]);
    pologon.push([new_y_b, new_x_b]);

    console.log(pologon);
    return pologon;
  }

  tick() {
    this.setState({
      positions: this.convertRangeBearingToPolygon(),
      bearing: this.state.bearing + Math.random() * 0.05
    });
  }

  render() {
    return <Polygon positions={this.state.positions} color="blue" />;
  }
}
