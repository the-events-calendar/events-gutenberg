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
import { Select } from '@moderntribe/common/components/form';
import { DatePicker } from '@moderntribe/events/elements';
import { Row, Label } from '@moderntribe/events-pro/elements';
import { options } from '@moderntribe/events-pro/data/blocks/exception';

const SingularField = ( {
	fieldType,
	multiDay,
	start,
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
					{ __( 'On', 'events-gutenberg' ) }
				</Label>
				<div className="tribe-events-pro-exception-field__time">
					<DatePicker
						datetime={ start }
						// TODO: Add onChange handler
					/>
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
};

export default SingularField;
