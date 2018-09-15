/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';

/**
 * Wordpress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { sendValue } from '@moderntribe/common/utils/input'

const SKU = ( { onChange, value, label } ) => (
	<div className="tribe-editor__tickets-form__row">
		<div className="tribe-editor__tickets-form__labels">
			<label htmlFor="ticket-sku">{ label }</label>
		</div>
		<div className="tribe-editor__tickets-form__input-group">
			<input id="ticket-sku" type="text" value={ value } onChange={ sendValue( onChange ) } />
		</div>
	</div>
);

SKU.propTypes = {
	label: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	value: PropTypes.string,
}

SKU.defaultProps = {
	label: __( 'Ticket SKU', 'events-gutenberg' ),
	onChange: noop,
	value: '',
}

export default SKU;
