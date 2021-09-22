import React from "react";
import { Marker, Popup } from "react-leaflet";
import { icon } from "leaflet";
import axios from "axios";

var DefaultIcon = icon({
  iconUrl:
    "https://cdn0.iconfinder.com/data/icons/basic-uses-symbol-vol-2/100/Help_Need_Suggestion_Question_Unknown-512.png",
  iconSize: [20, 20]
});

var JammerIcon = icon({
  iconUrl: "http://cdn.onlinewebfonts.com/svg/img_488609.png",
  iconSize: [20, 20]
});

var CameraIcon = icon({
  iconUrl:
    "https://icon-library.net/images/surveillance-camera-icon/surveillance-camera-icon-18.jpg",
  iconSize: [20, 20]
});

var RadarIcon = icon({
  iconUrl:
    "https://www.seekclipart.com/clipng/big/385-3858637_png-file-svg-airport-radar-icon-clipart.png",
  iconSize: [20, 20]
});

var TurretIcon = icon({
  iconUrl: "https://cdn.icon-icons.com/icons2/390/PNG/512/turret_37965.png",
  iconSize: [20, 20]
});

var ESMIcon = icon({
  iconUrl: "https://icon-library.net/images/icon-radio/icon-radio-26.jpg",
  iconSize: [20, 20]
});

var UnknownIcon = icon({
  iconUrl:
    "https://cdn0.iconfinder.com/data/icons/basic-uses-symbol-vol-2/100/Help_Need_Suggestion_Question_Unknown-512.png",
  iconSize: [20, 20]
});

var detectionArry = new Object();
var i;

export default class SensorMarker extends React.Component {
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
      case "Jammer":
        return JammerIcon;
      case "Camera":
        return CameraIcon;
      case "Radar":
        return RadarIcon;
      case "Turret":
        return TurretIcon;
      case "ESM":
        return ESMIcon;
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
            -- Sensor -- <br /> Type: {this.state.type} <br /> Lat :{" "}
            {this.state.lat} <br /> Lon: {this.state.lng}
          </span>
        </Popup>
      </Marker>
    );
  }
}
