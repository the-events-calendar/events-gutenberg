/**
 * External dependencies
 */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
	ToggleControl,
} from '@wordpress/components';

import { __ } from '@wordpress/i18n';
import { Select } from '@moderntribe/common/components/form';
import { DatePicker, TimePicker } from '@moderntribe/events/elements';
import { Row, Label } from '@moderntribe/events-pro/elements';
import { options } from '@moderntribe/events-pro/data/blocks/recurring';

const SingularField = ( props ) => {
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
					/>
				</div>
			</Row>
			<Row>
				<Label>
					{ __( 'On', 'events-gutenberg' ) }
				</Label>
				<div>
					<DatePicker datetime="1999-01-01 12:00:00" />
				</div>
			</Row>
			<Row>
				<Label>
					{ __( 'From', 'events-gutenberg' ) }
				</Label>
				<div className="tribe-events-pro-recurring-block__row__time">
					<TimePicker />
					<span>{ __( 'to', 'events-gutenberg' ) }</span>
					<TimePicker />
					<div>
						<ToggleControl
							label={ __( 'Multi-Day', 'events-gutenberg' ) }
							checked={ false }
							onChange={ () => {} }
						/>
					</div>
				</div>
			</Row>
		</Fragment>
	);
};

SingularField.propTypes = {};

export default SingularField;
