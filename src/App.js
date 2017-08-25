import React, {Component} from 'react';
import 'font-awesome/css/font-awesome.min.css';
import './App.css';
import SocialButton from './SocialButton.js';
import MapView from "./MapView";

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
	render() {
		return (
			<div className="App">
				<div className="content-wrapper">
					<div id='mapWrapper'>
						<MapView/>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
