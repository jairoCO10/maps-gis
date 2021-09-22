import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

import MapComponent from "./Map";
import DetectionMarker from "./Detection";
import SensorMarker from "./Sensor";
import RangeBearingFOVMarker from "./RangeBearingFieldOfView";
import FOVMarker from "./FieldOfView";
import AlertMarker from "./Alert";
import ROIMarker from "./RegionOfInterest";

import config from "../config.json";
console.log(config);

var ROIs = [];
ROIs.push(
  <ROIMarker
    positions={[
      [54.835, -4.8374],
      [54.835, -4.8574],
      [54.825, -4.8574],
      [54.825, -4.8374]
    ]}
    id={"1"}
  />
);
ROIs.push(
  <ROIMarker
    positions={[
      [54.83, -4.8474],
      [54.83, -4.8674],
      [54.82, -4.8674],
      [54.82, -4.8474]
    ]}
    id={"2"}
  />
);

var Alerts = [];
Alerts.push(
  <AlertMarker
    lat={54.766 + Math.random() * 0.05}
    lng={-4.855 + Math.random() * 0.05}
    type={"High"}
    id={"11"}
  />
);
Alerts.push(
  <AlertMarker
    lat={54.765 + Math.random() * 0.05}
    lng={-4.82 + Math.random() * 0.05}
    type={"Medium"}
    id={"25"}
  />
);
Alerts.push(
  <AlertMarker
    lat={54.765 + Math.random() * 0.05}
    lng={-4.81 + Math.random() * 0.05}
    type={"Low"}
    id={"37"}
  />
);

var Detections = [];
Detections.push(
  <DetectionMarker
    lat={54.8 + Math.random() * 0.05}
    lng={-4.83 + Math.random() * 0.05}
    type={"Drone"}
    id={"397"}
  />
);
Detections.push(
  <DetectionMarker
    lat={54.85 + Math.random() * 0.05}
    lng={-4.96 + Math.random() * 0.05}
    type={"Car"}
    id={"397"}
  />
);
Detections.push(
  <DetectionMarker
    lat={54.858 + Math.random() * 0.05}
    lng={-4.966 + Math.random() * 0.05}
    type={"Human"}
    id={"397"}
  />
);
Detections.push(
  <DetectionMarker
    lat={54.81 + Math.random() * 0.05}
    lng={-4.82 + Math.random() * 0.05}
    type={"Unknown"}
    id={"398"}
  />
);

var Sensors = [];
Sensors.push(
  <SensorMarker lat={54.83} lng={-4.9774} type={"Jammer"} id={"396"} />
);
Sensors.push(
  <SensorMarker lat={54.855} lng={-4.872} type={"Camera"} id={"395"} />
);
Sensors.push(
  <SensorMarker lat={54.837} lng={-4.945} type={"Radar"} id={"394"} />
);
Sensors.push(
  <SensorMarker lat={54.847} lng={-4.965} type={"Turret"} id={"393"} />
);

var FOVs = [];
FOVs.push(
  <FOVMarker
    positions={[
      [54.835, -4.9674],
      [54.835, -4.9874],
      [54.825, -4.9874],
      [54.825, -4.9674]
    ]}
    id={"396"}
  />
);
FOVs.push(
  <RangeBearingFOVMarker
    range={550}
    fov={55}
    bearing={0}
    centre_position={[54.855, -4.872]}
    id={"396"}
  />
);
FOVs.push(
  <RangeBearingFOVMarker
    range={8000}
    fov={270}
    bearing={15}
    centre_position={[54.837, -4.945]}
    id={"396"}
  />
);

ReactDOM.render(
  <MapComponent
    alerts={Alerts}
    detections={Detections}
    sensors={Sensors}
    fovs={FOVs}
    rois={ROIs}
  />,
  document.getElementById("mapContainer")
);
