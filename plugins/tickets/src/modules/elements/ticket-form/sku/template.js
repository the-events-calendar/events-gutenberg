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
import { Dashicon } from '@wordpress/components';
import uniqid from 'uniqid';

/**
 * Internal dependencies
 */
import { sendValue } from '@moderntribe/common/utils/input';
import { LabelWithTooltip } from '@moderntribe/tickets/elements';

const SKU = ( { onChange, value, label, tooltip } ) => {
	const id = uniqid( 'ticket-sku' );
	return (
		<div className="tribe-editor__tickets-form__row">
			<LabelWithTooltip
				className="tribe-editor__tickets-form__label"
				id={ id }
				label={ label }
				tooltipText={ tooltip }
				tooltipLabel={ <Dashicon icon="info-outline" /> }
			/>
			<div className="tribe-editor__tickets-form__input-group">
				<input id={ id } type="text" value={ value } onChange={ sendValue( onChange ) } />
			</div>
		</div>
	);
}

SKU.propTypes = {
	label: PropTypes.string,
	tooltip: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	value: PropTypes.string,
}

SKU.defaultProps = {
	label: __( 'Ticket SKU', 'events-gutenberg' ),
	tooltip: __(
		'A unique identifying code for each ticket type you\'re selling',
		'events-gutenberg'
	),
	onChange: noop,
	value: '',
}

export default SKU;
