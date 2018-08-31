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
import {
	roundTime,
	toMoment,
} from '@moderntribe/events/editor/utils/moment';
import { Select } from '@moderntribe/common/components/form';
import { DatePicker, TimePicker } from '@moderntribe/events/elements';
import { Row, Label } from '@moderntribe/events-pro/elements';
import { options } from '@moderntribe/events-pro/data/blocks/recurring';

const SingularField = ( {
	allDay,
	end,
	multiDay,
	start,
} ) => {
	const startMoment = toMoment( start );
	const endMoment = toMoment( end );

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
				<div className="tribe-events-pro-rule-field__date">
					<DatePicker
						datetime={ start }
						// TODO: Add onChange handler
					/>
				</div>
			</Row>
			<Row>
				<Label>
					{ __( 'From', 'events-gutenberg' ) }
				</Label>
				<div className="tribe-events-pro-rule-field__time">
					<TimePicker
						current={ startMoment }
						start={ startMoment.clone().startOf( 'day' ) }
						end={ roundTime( startMoment.clone().endOf( 'day' ) ) }
						allDay={ allDay }
						// TODO: Add onChange handler
					/>
					<span>{ __( 'to', 'events-gutenberg' ) }</span>
					<TimePicker
						current={ endMoment }
						start={ endMoment.clone().startOf( 'day' ) }
						end={ roundTime( endMoment.clone().endOf( 'day' ) ) }
						allDay={ allDay }
						// TODO: Add onChange handler
					/>
					<div className="tribe-events-pro-rule-field__time__multi-day">
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
