'use strict';

import React from 'react';

const Mixin = ComposedComponent => class extends React.Component {
	constructor() {
		super();
		console.log('composed constructor');
	}

	render() {
		console.log('composed render');
		return (
			<ComposedComponent {...this.props} />
		);
	}
}

//@Mixin
class Tournament extends React.Component {

	constructor() {
		super();
		console.log('original component constructor');
		this.state = {
			count: 0
		};
	}

	clickHandler = e => {
		this.setState({
			count: this.state.count + 1
		});
	};

	render() {
		console.log(this);
		return (
			//<svg width={this.props.width} height={this.props.height} />
			<div onClick={this.clickHandler}>Original Component {this.state.count}</div>
		);
	}
}

//const Tournament = React.createClass({
	//getInitialState() {
		//console.log('mycomponent constructor');
		//return {};
	//},
	//render() {
		//console.log('mycomponent render');
		//return <div>Original Component</div>;
	//}
//});

export default Tournament;
