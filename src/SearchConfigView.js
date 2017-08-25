import React, {Component} from 'react';

export default class SearchConfigView extends Component {

	constructor(props) {
		super(props);
	}

	handleRadiusChange(event) {
		this.props.onRadiusChange(event.target.value);
	}

	handleAreaChange(event) {
		this.props.onAreaChange(event.target.value);
	}

	render() {
		return (<div id="pointFilterPanel">
				<div>
					<span>
						Radius
						<input className='filter' type="text"
					       value={this.props.radius}
					       onChange={this.handleRadiusChange.bind(this)}/>
						km
					</span>
				</div>
				<div>
					<span>
						Building area
						<input className='filter'
						       type="text"
						       value={this.props.area}
						       onChange={this.handleAreaChange.bind(this)}/>
						m<sup>2</sup>
					</span>
				</div>
			</div>
		);
	}
}