/**
 * External dependencies
 */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
	ToggleControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { moment as momentUtils } from '@moderntribe/common/utils';
import { Select } from '@moderntribe/common/components/form';
import { TimePicker } from '@moderntribe/common/elements';
import { Row, Label, DatePickerInput } from '@moderntribe/events-pro/elements';
import { options } from '@moderntribe/events-pro/data/blocks/recurring';

const SingularField = ( {
	allDay,
	end,
	multiDay,
	start,
} ) => {
	const startMoment = momentUtils.toTime24Hr( momentUtils.toMoment( start ) );
	const endMoment = momentUtils.toTime24Hr( momentUtils.toMoment( end ) );

	return (
		<Fragment>
			<Row>
				<Label>
					{ __( 'A', 'events-gutenberg' ) }
				</Label>
				<div>
					<Select
						options={ options.RECURRENCE_TYPE_RULES_OPTIONS }
						value="single"
						// TODO: Add onChange handler
					/>
				</div>
			</Row>
			<Row>
				<Label>
					{ __( 'On', 'events-gutenberg' ) }
				</Label>
				<div className="tribe-editor__events-pro-rule-field__date">
					<DatePickerInput
						datetime={ start }
						// TODO: Add onChange handler
					/>
				</div>
			</Row>
			<Row>
				<Label>
					{ __( 'From', 'events-gutenberg' ) }
				</Label>
				<div className="tribe-editor__events-pro-rule-field__time">
					<TimePicker
						current={ startMoment }
						// TODO: logic to handle start and end times
						start="00:00"
						end="23;59"
						allDay={ allDay }
						// TODO: Add onChange handler
					/>
					<span>{ __( 'to', 'events-gutenberg' ) }</span>
					<TimePicker
						current={ endMoment }
						// TODO: logic to handle start and end times
						start="00:00"
						end="23:59"
						allDay={ allDay }
						// TODO: Add onChange handler
					/>
					<div className="tribe-editor__events-pro-rule-field__time__multi-day">
						<ToggleControl
							label={ __( 'Multi-Day', 'events-gutenberg' ) }
							checked={ multiDay }
							// TODO: Add onChange handler
							onChange={ () => {} }
						/>
					</div>
				</div>
			</Row>
		</Fragment>
	);
};

SingularField.propTypes = {
	allDay: PropTypes.bool.isRequired,
	end: PropTypes.string.isRequired,
	multiDay: PropTypes.bool.isRequired,
	start: PropTypes.string.isRequired,
};

export default SingularField;
