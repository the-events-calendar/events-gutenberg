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

/**
 * @todo: Connect this component into the store to inject and get all this properties by the name
 * and replace the "key" of the additional field in the store to be the meta field value instead
 * of the field name as multiple field of different types can have the same name
 */

const TextField = (  { isPristine, isSelected, name, output, input, settings } ) => {

	if ( isSelected ) {
		const nameNormalized = normalize( name );
		return [
			<EditContainer key={ `edit-container-${ nameNormalized }` } name={ name }>
				{ input }
			</EditContainer>,
			settings ? settings : <Settings key={ `settings-${ nameNormalized }` } name={ name } />
		];
	}

	if ( isPristine ) {
		const placeholderMessage = sprintf(
			__( 'Add %1$s', 'events-gutenberg' ),
			capitalize( name )
		);
		return <Placeholder>{ placeholderMessage }</Placeholder>;
	} else {
		return <Preview name={ name }>{ output }</Preview>;
	}
};

TextField.propTypes = {
	name: PropTypes.string.isRequired,
	input: PropTypes.node.isRequired,
	isPristine: PropTypes.bool,
	isSelected: PropTypes.bool,
	settings: PropTypes.node,
	output: PropTypes.string,
};

TextField.defaultProps = {
	isPristine: true,
	isSelected: false,
};

export default TextField;
