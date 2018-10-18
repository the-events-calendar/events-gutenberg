/**
 * External dependencies
 */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';
import { proptypes } from '@moderntribe/common/data/plugins';

/**
 * Internal dependencies
 */
import {
	FromTimeRangePicker,
	OnDatePicker,
	TypePicker,
	SingleToDateTimePicker,
} from '@moderntribe/events-pro/elements';
import { options } from '@moderntribe/events-pro/data/blocks/exception';

const SingularField = ( { isMultiDay, typeOption, onTypeChange } ) => {
	return (
		<Fragment>
			<TypePicker
				rowLabel={ __( 'Excluding', 'events-gutenberg' ) }
				options={ options.EXCEPTION_OCCURRENCE_OPTIONS }
				selected={ typeOption }
				onChange={ onTypeChange }
			/>
			<OnDatePicker />
			<FromTimeRangePicker />
			{ isMultiDay && <SingleToDateTimePicker /> }
		</Fragment>
	);
};

SingularField.propTypes = {
	isMultiDay: PropTypes.bool.isRequired,
	typeOption: proptypes.ReactSelectOption,
	onTypeChange: PropTypes.func.isRequired,
};

export default SingularField;
