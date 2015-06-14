'use strict';

import React from 'react';

class Tournament extends React.Component {

	constructor() {
		super();
		console.log('original component constructor');
		this.state = {
			count: 0
		};

		this.clickHandler = e => {
			this.setState({
				count: this.state.count + 1
			});
		};
	}


	render() {
		console.log(this);
		return (
			//<svg width={this.props.width} height={this.props.height} />
			<div onClick={this.clickHandler}>Original Component {this.state.count}</div>
		);
	}
}

export default Tournament;
