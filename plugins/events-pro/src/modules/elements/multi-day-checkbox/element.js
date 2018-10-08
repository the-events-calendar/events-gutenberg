/**
 * External Dependencies
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import uniqid from 'uniqid';

/**
 * Internal Dependencies
 */
import Checkbox from '@moderntribe/common/elements/checkbox/element';

class MultiDayCheckbox extends PureComponent {
	static propTypes = {
		checked: PropTypes.bool.isRequired,
		className: PropTypes.string,
		disabled: PropTypes.bool,
		onChange: PropTypes.func.isRequired,
	};

	constructor( props ) {
		super( props );
		this.id = uniqid();
	}

	render() {
		const { checked, disabled, onChange } = this.props;

		return (
			<Checkbox
				checked={ checked }
				className={ classNames( 'tribe-editor__multi-day-checkbox', className ) }
				disabled={ disabled }
				id={ this.id }
				label={ __( 'Multi-day', 'events-gutenberg' ) }
				onChange={ onChange }
			/>
		)
	}
}

export default MultiDayCheckbox;
