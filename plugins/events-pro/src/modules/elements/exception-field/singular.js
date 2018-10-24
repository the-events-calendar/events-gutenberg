/* eslint-disable camelcase */
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
	OnDatePicker,
	TypePicker,
} from '@moderntribe/events-pro/elements';
import { constants } from '@moderntribe/events-pro/data/blocks';
import { options } from '@moderntribe/events-pro/data/blocks/exception';

const SingularField = ( { typeOption, index, handleStartDate, start_date } ) => {
	return (
		<Fragment>
			<TypePicker
				rowLabel={ __( 'A', 'events-gutenberg' ) }
				options={ options.EXCEPTION_OCCURRENCE_OPTIONS }
				selected={ typeOption }
				blockType={ constants.EXCEPTION }
				index={ index }
			/>
			<OnDatePicker
				index={ index }
				onDateChange={ handleStartDate }
				date={ start_date }
			/>
		</Fragment>
	);
};

SingularField.propTypes = {
	typeOption: proptypes.ReactSelectOption,
	index: PropTypes.number.isRequired,
	handleStartDate: PropTypes.func.isRequired,
	start_date: PropTypes.string.isRequired,
};

export default SingularField;
