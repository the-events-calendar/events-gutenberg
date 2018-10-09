/**
 * External dependencies
 */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import Select from '@moderntribe/common/elements/select/element';
import TimePicker from '@moderntribe/common/elements/time-picker/element';
import { Row, Label } from '@moderntribe/events-pro/elements';
import { constants, options } from '@moderntribe/events-pro/data/blocks/recurring';
import { TribePropTypes } from '@moderntribe/common/utils';

const RecurringToDateTimePicker = ( {
	className,
	endDate,
	endTime,
	onEndDateChange,
	onEndTimeChange,
	onEndTimeClick,
} ) => (
	<Row className={ classNames(
		'tribe-editor__events-pro__row--recurring-to-date-time-picker',
		'tribe-editor__recurring-to-date-time-picker',
		className
	) }>
		<Label className="tribe-editor__recurring-to-date-time-picker__label">
			{ __( 'To', 'events-gutenberg' ) }
		</Label>
		<div className="tribe-editor__recurring-to-date-time-picker__content">
			<TimePicker
				current={ endTime }
				// TODO: logic to handle start and end times
				start="00:00"
				end="23;59"
				onChange={ onEndTimeChange }
				onClick={ onEndTimeClick }
				// TODO: Add onChange handler
			/>
			<span>{ __( 'on the', 'events-gutenberg' ) }</span>
			<Select
				backspaceRemovesValue={ false }
				value={ endDate }
				isSearchable={ false }
				options={ [] }
				onChange={ onEndDateChange }
			/>
		</div>
	</Row>
);

RecurringToDateTimePicker.propTypes = {
	className: PropTypes.string,
	endDate: PropTypes.oneOf( [] ),
	endTime: TribePropTypes.timeFormat,
	onEndDateChange: PropTypes.func,
	onEndTimeChange: PropTypes.func,
	onEndTimeClick: PropTypes.func,
};

export default RecurringToDateTimePicker;
