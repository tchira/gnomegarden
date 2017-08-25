import React, {Component} from 'react';
import mapboxgl from "mapbox-gl";
import turf from 'turf';

export default class MapView extends Component {

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		mapboxgl.accessToken = 'pk.eyJ1IjoiY2hpcmF0dWRvciIsImEiOiJjaW10NHlhZWYwMDZzdm5seXZiOXM4bnpsIn0.eZ_3bNvBihSFfydEOwzbrg';
		this.map = new mapboxgl.Map({
			container: 'map',
			style: 'mapbox://styles/mapbox/dark-v9',
			center: [-73.985130, 40.758896],
			zoom: 17
		});
		this.map.on('load', () => {
			this._addBuildingsLayer();
			this._addBuildingNetLayer();
		});

	}

	_addBuildingsLayer() {
		this.map.addLayer({
			'id': '3d-buildings',
			'source': 'composite',
			'source-layer': 'building',
			'type': 'fill-extrusion',
			'minzoom': 15,
			'paint': {
				'fill-extrusion-color': '#34a2c7',
				'fill-extrusion-height': {
					'type': 'identity',
					'property': 'height'
				},
				'fill-extrusion-base': {
					'type': 'identity',
					'property': 'min_height'
				},
				'fill-extrusion-opacity': .6
			}
		});
	}

	_addBuildingNetLayer() {

		const computeBuildingNet = () => {
			const {lng, lat} = this.map.getCenter();
			const features = this.map.queryRenderedFeatures({layers: ['3d-buildings']});
			let lines = [];
			let points = [turf.point([lng, lat])];
			features.forEach(feature => {
				let area = turf.area(feature);
				let buildingCenter = turf.center(feature);
				buildingCenter.properties.radius = Math.floor(area/800);
				lines.push(turf.lineString([[lng, lat], buildingCenter.geometry.coordinates]));
				points.push(buildingCenter);
			});
			return turf.featureCollection(lines.concat(points));
		};

		let buildingNet = computeBuildingNet();
		this.map.addLayer({
			'id': 'building-net',
			'type': 'line',
			'source': {
				'type': 'geojson',
				'data': buildingNet
			},
			'minzoom': 16,
			"layout": {
				"line-join": "round",
				"line-cap": "round"
			},
			"paint": {
				"line-color": "#888",
				"line-width": 2,
				"line-blur": 0.3
			}
		}, '3d-buildings');

		this.map.addLayer({
			'id': 'building-centerpoints',
			'type': 'circle',
			'source': {
				'type': 'geojson',
				'data': buildingNet
			},
			'minzoom': 16,
			"paint": {
				'circle-color': "#fff0ed",
				'circle-radius': {
					'type':'identity',
					'property':'radius'
				},
				'circle-blur':0.7
			},
		}, '3d-buildings');

		this.map.on('move', () => {
			const lineSource = this.map.getSource('building-net');
			const pointSource = this.map.getSource('building-centerpoints');
			const buildingNet = computeBuildingNet();
			lineSource.setData(buildingNet);
			pointSource.setData(buildingNet);
		})
	}


	render() {
		return <div id="map"/>;
	}

}

