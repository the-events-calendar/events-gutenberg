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
	InMonth,
	OnDayOfMonthPicker,
	TypePicker,
	SeriesEnds,
} from '@moderntribe/events-pro/elements';
import { constants } from '@moderntribe/events-pro/data/blocks';
import { options } from '@moderntribe/events-pro/data/blocks/exception';

const YearlyField = ( { index } ) => {
	return (
		<Fragment>
			<TypePicker
				blockType={ constants.EXCEPTION }
				index={ index }
				options={ options.EXCEPTION_OCCURRENCE_OPTIONS }
				rowLabel={ __( 'Every', 'events-gutenberg' ) }
			/>
			<InMonth
				blockType={ constants.EXCEPTION }
				index={ index }
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

YearlyField.propTypes = {
	index: PropTypes.number.isRequired,
};

export default YearlyField;
