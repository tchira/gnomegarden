import React, {Component} from 'react';
import 'font-awesome/css/font-awesome.min.css';
import './App.css';
import SocialButton from './SocialButton.js';
import MapView from "./MapView";
import SearchConfigView from "./SearchConfigView";

const column = <div className="column column-background-flow">
	<div className="contact">
		<div className="social">
			<SocialButton icon="fa-facebook-square" url="https://www.facebook.com/gnomosapient"/>
			<SocialButton icon="fa-linkedin-square" url="https://www.linkedin.com/in/chira-tudor-98477361/"/>
			<SocialButton icon="fa-twitter-square" url="https://twitter.com/tudorchira/"/>
		</div>
	</div>
	<div className="pulsar"/>
	<div className="delayed-pulsar"/>
</div>

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			radiusKM: 0.2,
			area: 300
		}
	}

	handleRadiusChange(newRadius) {
		this.setState({radiusKM: newRadius});
	}

	handleAreaChange(newArea) {
		this.setState({area: newArea});
	}

	render() {
		return (
			<div className="App">
				<div className="content-wrapper">
					<SearchConfigView
						onRadiusChange={this.handleRadiusChange.bind(this)}
						onAreaChange={this.handleAreaChange.bind(this)}
						radius={this.state.radiusKM}
						area={this.state.area}
					/>
					<div id='mapWrapper'>
						<MapView radius={this.state.radiusKM} area={this.state.area}/>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
