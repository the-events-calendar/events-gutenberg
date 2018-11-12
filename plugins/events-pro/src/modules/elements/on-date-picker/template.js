/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { formatDate, parseDate } from 'react-day-picker/moment';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { DayPickerInput } from '@moderntribe/common/elements';
import LabeledRow from '@moderntribe/events-pro/elements/labeled-row/element';
import './style.pcss';

const OnDatePicker = ( {
	className,
	date,
	dateFormat,
	onDateChange,
} ) => {
	const dateObj = new Date( date );

	return (
		<LabeledRow
			className={ classNames(
				'tribe-editor__on-date-picker',
				className
			) }
			label={ __( 'On', 'events-gutenberg' ) }
		>
			<DayPickerInput
				value={ date }
				format={ dateFormat }
				formatDate={ formatDate }
				parseDate={ parseDate }
				dayPickerProps={ {
					modifiers: {
						start: dateObj,
						end: dateObj,
					},
				} }
				onDayChange={ onDateChange }
			/>
		</LabeledRow>
	);
};

OnDatePicker.propTypes = {
	className: PropTypes.string,
	date: PropTypes.string,
	dateFormat: PropTypes.string,
	onDateChange: PropTypes.func,
};

OnDatePicker.defaultProps = {
	dateFormat: 'LL',
};

export default OnDatePicker;
