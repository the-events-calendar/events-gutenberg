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
	TypePicker,
	SeriesEnds,
} from '@moderntribe/events-pro/elements';
import { constants } from '@moderntribe/events-pro/data/blocks';
import { options } from '@moderntribe/events-pro/data/blocks/recurring';

const DailyField = ( { index } ) => {
	return (
		<Fragment>
			<TypePicker
				blockType={ constants.EXCEPTION }
				index={ index }
				options={ options.RECURRENCE_TYPE_RULES_OPTIONS }
			/>
			<SeriesEnds
				blockType={ constants.EXCEPTION }
				index={ index }
				rowLabel={ __( 'Exception ends', 'events-gutenberg' ) }
			/>
		</Fragment>
	);
};

DailyField.propTypes = {
	index: PropTypes.number.isRequired,
};

export default DailyField;
