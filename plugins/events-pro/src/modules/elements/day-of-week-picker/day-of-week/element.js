/**
 * External dependencies
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import uniqid from 'uniqid';

/**
 * Internal dependencies
 */
import { Checkbox } from '@moderntribe/common/elements';
import './style.pcss';

class DayOfWeek extends PureComponent {
	static propTypes = {
		checked: PropTypes.bool.isRequired,
		className: PropTypes.string,
		disabled: PropTypes.bool,
		label: PropTypes.string.isRequired,
		labelTitle: PropTypes.string.isRequired,
		onChange: PropTypes.func.isRequired,
		value: PropTypes.string.isRequired,
	};

	constructor( props ) {
		super( props );
		this.id = uniqid();
	}

	getLabel = ( label, labelTitle ) => (
		<abbr
			className='tribe-editor__day-of-week__label-abbr'
			title={ labelTitle }
		>
			{ label }
		</abbr>
	);

	render() {
		const {
			checked,
			className,
			disabled,
			label,
			labelTitle,
			onChange,
			value,
		} = this.props;

		return (
			<Checkbox
				checked={ checked }
				className={ classNames( 'tribe-editor__day-of-week', className ) }
				disabled={ disabled }
				id={ this.id }
				label={ this.getLabel( label, labelTitle ) }
				onChange={ onChange }
				value={ value }
			/>
		);
	}
};

export default DayOfWeek;
