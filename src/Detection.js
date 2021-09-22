import React from "react";
import { Marker, Popup } from "react-leaflet";
import { icon } from "leaflet";
import axios from "axios";

var DefaultIcon = icon({
  iconUrl:
    "https://cdn0.iconfinder.com/data/icons/basic-uses-symbol-vol-2/100/Help_Need_Suggestion_Question_Unknown-512.png",
  iconSize: [20, 20]
});

var DroneIcon = icon({
  iconUrl: "https://img.icons8.com/material-rounded/24/000000/drone.png",
  iconSize: [20, 20]
});

var CarIcon = icon({
  iconUrl: "https://static.thenounproject.com/png/72-200.png",
  iconSize: [20, 20]
});

var HumanIcon = icon({
  iconUrl: "https://myrealdomain.com/images600_/human-icon-png-3.png",
  iconSize: [20, 23]
});

var UnknownIcon = icon({
  iconUrl:
    "https://cdn0.iconfinder.com/data/icons/basic-uses-symbol-vol-2/100/Help_Need_Suggestion_Question_Unknown-512.png",
  iconSize: [20, 20]
});

var detectionArry = new Object();
var i;

export default class DetectionMarker extends React.Component {
  state = {
    id: this.props.id,
    lat: this.props.lat, //54.820681,
    lng: this.props.lng, //-4.996791,
    type: this.props.type,
    icon: DefaultIcon,
    circle: null
  };

  iconSwitch(param) {
    switch (param) {
      default:
        return DefaultIcon;
      case "Drone":
        return DroneIcon;
      case "Car":
        return CarIcon;
      case "Human":
        return HumanIcon;
      case "Unknown":
        return UnknownIcon;
    }
  }

  componentDidMount() {
    this.intervalID = setInterval(() => this.tick(), 300);
  }
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }
  getData() {
    axios
      .get("http://localhost:5003/detect_report")
      .then(response => {
        //console.log("RESPONSE", response.data);
        detectionArry = response.data[0];
      })
      .catch(error => {
        console.log(error);
      });
    return detectionArry;
  }
  tick() {
    detectionArry = this.getData();
    console.log("ARRAY", detectionArry[0]);
    // Just for local testing - remove in production
    this.setState({
      icon: this.iconSwitch(this.state.type)
    });
    if (detectionArry[0] != undefined) {
      for (i = 0; i < detectionArry.length; i++) {
        if (detectionArry[i]["object_id"] == this.props.id) {
          this.setState({
            lat: detectionArry[i]["x"],
            lng: detectionArry[i]["y"],
            icon: this.iconSwitch(this.state.type)
          });
        }
      }
    }
  }

  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <Marker position={position} icon={this.state.icon}>
        <Popup>
          <span>
            -- Detection -- <br /> Type: {this.state.type} <br /> Lat :{" "}
            {this.state.lat} <br /> Lon: {this.state.lng}
          </span>
        </Popup>
      </Marker>
    );
  }
}
