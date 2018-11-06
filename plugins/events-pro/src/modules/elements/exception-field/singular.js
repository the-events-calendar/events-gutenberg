/* eslint-disable camelcase */
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
	OnDatePicker,
	TypePicker,
} from '@moderntribe/events-pro/elements';
import { constants } from '@moderntribe/events-pro/data/blocks';
import { options } from '@moderntribe/events-pro/data/blocks/exception';

const SingularField = ( { index } ) => {
	return (
		<Fragment>
			<TypePicker
				blockType={ constants.EXCEPTION }
				index={ index }
				options={ options.EXCEPTION_OCCURRENCE_OPTIONS }
				rowLabel={ __( 'A', 'events-gutenberg' ) }
			/>
			<OnDatePicker
				blockType={ constants.EXCEPTION }
				index={ index }
			/>
		</Fragment>
	);
};

SingularField.propTypes = {
	index: PropTypes.number.isRequired,
};

export default SingularField;
