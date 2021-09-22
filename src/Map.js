import React from "react";
import {
  Map,
  TileLayer,
  withLeaflet,
  LayersControl,
  LayerGroup,
  ScaleControl
} from "react-leaflet";
import PrintControlDefault from "react-leaflet-easyprint";
const { BaseLayer, Overlay } = LayersControl;
const PrintControl = withLeaflet(PrintControlDefault);

// Map Component
export default class MapComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 54.851101,
      lng: -4.948088,
      zoom: 13
    };
  }

  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <Map center={position} zoom={this.state.zoom}>
        <LayersControl>
          <BaseLayer checked name="OpenStreetMap">
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
            />
          </BaseLayer>
          <Overlay checked name="Detections">
            <LayerGroup>{this.props.detections}</LayerGroup>
          </Overlay>
          <Overlay checked name="Sensors">
            <LayerGroup>{this.props.sensors}</LayerGroup>
          </Overlay>
          <Overlay checked name="FOVs">
            <LayerGroup>{this.props.fovs}</LayerGroup>
          </Overlay>
          <Overlay checked name="Alerts">
            <LayerGroup>{this.props.alerts}</LayerGroup>
          </Overlay>
          <Overlay checked name="Regions of Interest">
            <LayerGroup>{this.props.rois}</LayerGroup>
          </Overlay>
        </LayersControl>
        <ScaleControl position="bottomleft" />
        <PrintControl
          ref={ref => {
            this.printControl = ref;
          }}
          position="topleft"
          sizeModes={["Current", "A4Portrait", "A4Landscape"]}
          hideControlContainer={false}
        />
        <PrintControl
          position="topleft"
          sizeModes={["Current", "A4Portrait", "A4Landscape"]}
          hideControlContainer={false}
          title="Export as PNG"
          exportOnly
        />
      </Map>
    );
  }
}
