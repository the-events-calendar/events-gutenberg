/**
 * External dependencies
 */
import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';

import './style.pcss';

class DateInput extends Component {
	static propTypes = {
		selected: PropTypes.bool,
		children: PropTypes.node,
		placeholder: PropTypes.string,
		onClickHandler: PropTypes.func,
	};

	static defaultProps = {
		selected: false,
		children: null,
		placeholder: 'Enter your date',
		onClickHandler: noop,
	};

	constructor( props ) {
		super( props );
		this.inputRef = createRef();
	}

	renderInput() {
		const { placeholder } = this.props;
		return (
			<input
				type="text"
				name="date-input"
				className="tribe-editor__date-input"
				ref={ this.inputRef }
				placeholder={ placeholder }
			/>
		);
	}

	render() {
		const { children, selected } = this.props;
		return (
			<div>
				{ selected ? this.renderInput() : children }
			</div>
		);
	}
}

export default DateInput;
