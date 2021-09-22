import React from "react";
import { Marker, Popup } from "react-leaflet";
import { icon } from "leaflet";
import axios from "axios";

var DefaultIcon = icon({
  iconUrl:
    "https://cdn0.iconfinder.com/data/icons/basic-uses-symbol-vol-2/100/Help_Need_Suggestion_Question_Unknown-512.png",
  iconSize: [20, 20]
});

var HighIcon = icon({
  iconUrl: "https://www.iconsdb.com/icons/preview/red/warning-xxl.png",
  iconSize: [20, 20]
});

var MediumIcon = icon({
  iconUrl: "https://www.iconsdb.com/icons/preview/orange/warning-3-xxl.png",
  iconSize: [20, 20]
});

var LowIcon = icon({
  iconUrl: "https://www.iconsdb.com/icons/preview/green/warning-3-xxl.png",
  iconSize: [20, 20]
});

var detectionArry = new Object();
var i;

export default class AlertMarker extends React.Component {
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
      case "High":
        return HighIcon;
      case "Medium":
        return MediumIcon;
      case "Low":
        return LowIcon;
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
            -- Alert -- <br /> ID: {this.state.id} <br /> Type:{" "}
            {this.state.type} <br /> Lat : {this.state.lat} <br /> Lon:{" "}
            {this.state.lng}
          </span>
        </Popup>
      </Marker>
    );
  }
}
