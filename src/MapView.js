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
			let lines = [];
			const mapCenterFeature = turf.point([lng, lat]);
			let points = [mapCenterFeature];
			const features = this.map.queryRenderedFeatures({layers: ['3d-buildings']});

			let nearCenterFeatures = features
				.map(feature => ({
					center: turf.center(feature),
					area: turf.area(feature),
					feature
				}))
				.filter(({center,area,feature}) =>
					turf.distance(mapCenterFeature, center) <= this.props.radius
					&& area <= this.props.area);

			nearCenterFeatures.forEach(({center, area, feature}) => {
				let buildingCenter = turf.center(feature);
				buildingCenter.properties.radius = Math.floor(area / 800);
				lines.push(turf.lineString([[lng, lat], buildingCenter.geometry.coordinates]));
				points.push(buildingCenter);
			});

			const triangleNetwork = turf.tin(turf.featureCollection(points));

			return {
				lines: turf.featureCollection(lines),
				points: turf.featureCollection(points),
				triangles: triangleNetwork
			}
		};


		let buildingNet = computeBuildingNet();
		this.map.addLayer({
			'id': 'building-net',
			'type': 'line',
			'source': {
				'type': 'geojson',
				'data': buildingNet.lines
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
			},
		}, '3d-buildings');

		this.map.addLayer({
			'id': 'building-centerpoints',
			'type': 'circle',
			'source': {
				'type': 'geojson',
				'data': buildingNet.points
			},
			'minzoom': 16,
			"paint": {
				'circle-color': "#fff0ed",
				'circle-radius': {
					'type': 'identity',
					'property': 'radius'
				},
				'circle-blur': 0.7
			},
			"filter": ["==", "$type", "Point"]
		}, '3d-buildings');

		this.map.addLayer({
			'id': 'tin',
			'type': 'fill',
			'source': {
				'type': 'geojson',
				'data': buildingNet.triangles
			},
			'minzoom': 16,
			'paint': {
				'fill-color': '#7747a4',
				'fill-opacity': 0.3
			}
		}, '3d-buildings');

		this.map.addLayer({
			'id': 'tin-lines',
			'type': 'line',
			'source': {
				'type': 'geojson',
				'data': buildingNet.triangles
			},
			'minzoom': 16,
			"layout": {
				"line-join": "round",
				"line-cap": "round"
			},
			"paint": {
				"line-color": "#ffffff",
				"line-width": 1,
				"line-blur": 0.8,
				"line-opacity": 0.7
			},
		}, '3d-buildings');

		this.map.on('move', () => {
			const lineSource = this.map.getSource('building-net');
			const pointSource = this.map.getSource('building-centerpoints');
			const triangleSource = this.map.getSource('tin');
			const triangleStrokeSource = this.map.getSource('tin-lines');
			const {lines, points, triangles} = computeBuildingNet();

			lineSource.setData(lines);
			pointSource.setData(points);
			triangleSource.setData(triangles);
			triangleStrokeSource.setData(triangles);
		})
	}


	render() {
		return <div id="map"/>;
	}

}

