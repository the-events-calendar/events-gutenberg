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
	OnDayOfWeek,
	TypePicker,
	SeriesEnds,
} from '@moderntribe/events-pro/elements';
import { constants } from '@moderntribe/events-pro/data/blocks';
import { options } from '@moderntribe/events-pro/data/blocks/exception';

const WeeklyField = ( { index } ) => {
	return (
		<Fragment>
			<TypePicker
				blockType={ constants.EXCEPTION }
				options={ options.EXCEPTION_OCCURRENCE_OPTIONS }
				index={ index }
				rowLabel={ __( 'Every', 'events-gutenberg' ) }
			/>
			<OnDayOfWeek
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

WeeklyField.propTypes = {
	index: PropTypes.number.isRequired,
};

export default WeeklyField;
