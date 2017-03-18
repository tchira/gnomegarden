import React, {Component} from 'react';
import 'font-awesome/css/font-awesome.min.css';
import './App.css';
import SocialButton from './SocialButton.js';


class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="column column-background-flow">
                    <div className="contact">
                        <div className="social">
                            <SocialButton icon="fa-facebook-square" url="https://www.facebook.com/gnomosapient"></SocialButton>
                            <SocialButton icon="fa-linkedin-square" url="https://www.linkedin.com/in/chira-tudor-98477361/"></SocialButton>
                            <SocialButton icon="fa-twitter-square" url="https://twitter.com/tudorchira/"></SocialButton>
                        </div>
                    </div>
                    <div className="pulsar"></div>
                    <div className="delayed-pulsar"></div>
                </div>
                <div className="content-wrapper">
                </div>
            </div>
        );
    }
}

export default App;
