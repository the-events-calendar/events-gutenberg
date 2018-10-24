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
	OnDayOfWeek,
	TypePicker,
	SeriesEnds,
} from '@moderntribe/events-pro/elements';
import { constants } from '@moderntribe/events-pro/data/blocks';
import { options } from '@moderntribe/events-pro/data/blocks/exception';

const WeeklyField = ( { typeOption, index } ) => {
	return (
		<Fragment>
			<TypePicker
				rowLabel={ __( 'Every', 'events-gutenberg' ) }
				options={ options.EXCEPTION_OCCURRENCE_OPTIONS }
				selected={ typeOption }
				blockType={ constants.EXCEPTION }
				index={ index }
			/>
			<OnDayOfWeek
				index={ index }
				blockType={ constants.EXCEPTION }
			/>
			<SeriesEnds
				rowLabel={ __( 'Exception ends', 'events-gutenberg' ) }
				index={ index }
				blockType={ constants.EXCEPTION }
			/>
		</Fragment>
	);
};

WeeklyField.propTypes = {
	typeOption: proptypes.ReactSelectOption,
	index: PropTypes.number.isRequired,
};

export default WeeklyField;
