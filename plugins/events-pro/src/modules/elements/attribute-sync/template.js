/**
 * External dependencies
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class AttributeSync extends Component {
	static propTypes = {
		clientId: PropTypes.string.isRequired,
		initialize: PropTypes.func.isRequired,
		cancel: PropTypes.func.isRequired,
	}

	componentDidMount() {
		this.props.initialize();
	}

	shouldComponentUpdate() {
		return false; // Never update
	}

	componentWillUnmount() {
		this.props.cancel();
	}

	render() {
		return null;
	}
}
