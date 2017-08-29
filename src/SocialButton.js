/**
 * Created by Blacksmith on 3/18/2017.
 */
import React, {Component} from 'react';

class SocialButton extends Component {

    constructor(props) {
        super(props);
    }

    handleClick(e) {
        window.open(this.props.url, 'blank');
    }

    render() {
        return <div
            className={`fa ${this.props.icon} hvr-grow large-font social-item`}
            onClick={this.handleClick.bind(this)}>
        </div>
    }
}

export default SocialButton;