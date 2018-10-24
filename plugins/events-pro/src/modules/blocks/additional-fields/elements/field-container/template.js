/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import { sprintf } from 'sprintf-js';
import capitalize from 'lodash/capitalize';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { Placeholder } from '@moderntribe/common/elements';
import { normalize } from '@moderntribe/common/utils/string';
import {
	Preview,
	EditContainer,
	Settings,
} from '@moderntribe/events-pro/blocks/additional-fields/elements';

const FieldTemplate = ( { isPristine, isSelected, label, output, input, settings } ) => {

	if ( isSelected ) {
		const nameNormalized = normalize( label );
		return [
			<EditContainer key={ `edit-container-${ nameNormalized }` } name={ label }>
				{ input }
			</EditContainer>,
			settings ? settings : <Settings key={ `settings-${ nameNormalized }` } name={ label } />
		];
	}

	if ( isPristine ) {
		const placeholderMessage = sprintf(
			__( 'Add %1$s', 'events-gutenberg' ),
			capitalize( label )
		);
		return <Placeholder>{ placeholderMessage }</Placeholder>;
	} else {
		return <Preview name={ label }>{ output }</Preview>;
	}
};

FieldTemplate.propTypes = {
	id: PropTypes.string.isRequired,
	input: PropTypes.node.isRequired,
	label: PropTypes.string,
	isPristine: PropTypes.bool,
	isSelected: PropTypes.bool,
	settings: PropTypes.node,
	output: PropTypes.node,
};

FieldTemplate.defaultProps = {
	isPristine: true,
	isSelected: false,
};

export default FieldTemplate;
