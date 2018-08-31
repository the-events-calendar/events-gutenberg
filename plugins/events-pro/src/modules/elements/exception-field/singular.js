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
	toMoment,
} from '@moderntribe/events/editor/utils/moment';
import { Select } from '@moderntribe/common/components/form';
import { Row, Label, DatePickerInput } from '@moderntribe/events-pro/elements';
import { options } from '@moderntribe/events-pro/data/blocks/exception';

const SingularField = ( {
	fieldType,
	multiDay,
	start,
	end,
} ) => {
	return (
		<Fragment>
			<Row>
				<Label>
					{ __( 'A', 'events-gutenberg' ) }
				</Label>
				<div className="tribe-events-pro-exception-field__date">
					<Select
						options={ options.EXCEPTION_OCCURRENCE_OPTIONS }
						value={ fieldType }
						// TODO: Add onChange handler
					/>
				</div>
			</Row>
			<Row>
				<Label>
					{
						multiDay
							? __( 'From', 'events-gutenberg' )
							: __( 'On', 'events-gutenberg' )
					}
				</Label>
				<div className="tribe-events-pro-exception-field__time">
					<DatePickerInput
						datetime={ toMoment( start ).add( 1, 'day' ) }
						// TODO: Add onChange handler
					/>
					{
						multiDay && (
							<Fragment>
								<span>{ __( 'to', 'events-gutenberg' ) }</span>
								<DatePickerInput
									datetime={ toMoment( start ).add( 2, 'days' ) }
								/>
							</Fragment>
						)
					}
					<div className="tribe-events-pro-exception-field__time__multi-day">
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
	fieldType: PropTypes.string.isRequired,
	multiDay: PropTypes.bool.isRequired,
	start: PropTypes.string.isRequired,
	end: PropTypes.string.isRequired,
};

export default SingularField;