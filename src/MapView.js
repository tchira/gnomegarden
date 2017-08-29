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
		});
	}

	render() {
		console.log(this.props);
		return <div id="map"/>;
	}

}

