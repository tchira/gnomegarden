import React, {Component} from 'react';
import 'font-awesome/css/font-awesome.min.css';
import './App.css';
import SocialButton from './SocialButton.js';

class App extends Component {

	render() {
		return (
			<div className="App">
				<div className="centered contact">
					<label className="large-font">Chira Tudor</label>
					<div className="social side-padded">
						<SocialButton icon="fa-facebook-square" url="https://www.facebook.com/gnomosapient"/>
						<SocialButton icon="fa-linkedin-square"
						              url="https://www.linkedin.com/in/chira-tudor-98477361/"/>
						<SocialButton icon="fa-twitter-square" url="https://twitter.com/tudorchira/"/>
						<SocialButton icon="fa-github-square" url="https://github.com/tchira"/>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
