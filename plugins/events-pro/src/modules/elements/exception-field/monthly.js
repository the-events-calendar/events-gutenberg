/**
 * External dependencies
 */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import {
	OnDayOfMonthPicker,
	TypePicker,
	SeriesEnds,
} from '@moderntribe/events-pro/elements';
import { constants } from '@moderntribe/events-pro/data/blocks';
import { options } from '@moderntribe/events-pro/data/blocks/exception';

const MonthlyField = ( { index } ) => {
	return (
		<Fragment>
			<TypePicker
				blockType={ constants.EXCEPTION }
				index={ index }
				options={ options.EXCEPTION_OCCURRENCE_OPTIONS }
				rowLabel={ __( 'Every', 'events-gutenberg' ) }
			/>
			<OnDayOfMonthPicker
				blockType={ constants.EXCEPTION }
				index={ index }
			/>
			<SeriesEnds
				blockType={ constants.EXCEPTION }
				index={ index }
				rowLabel={ __( 'Exception ends', 'events-gutenberg' ) }
			/>
		</Fragment>
	);
};

MonthlyField.propTypes = {
	index: PropTypes.number.isRequired,
};

export default MonthlyField;
