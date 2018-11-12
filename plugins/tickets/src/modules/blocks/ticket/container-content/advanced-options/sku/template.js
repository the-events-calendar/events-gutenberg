/**
 * External dependencies
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

/**
 * Wordpress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Dashicon } from '@wordpress/components';
import uniqid from 'uniqid';

/**
 * Internal dependencies
 */
import { Input } from '@moderntribe/common/elements';
import { LabelWithTooltip } from '@moderntribe/tickets/elements';

class SKU extends PureComponent {
	static propTypes = {
		onChange: PropTypes.func.isRequired,
		value: PropTypes.string,
	};

	constructor( props ) {
		super( props );
		this.id = uniqid( 'ticket-sku' );
	}

	render() {
		const { value, onChange } = this.props;

		return (
			<div className="tribe-editor__ticket__sku">
				<LabelWithTooltip
					className="tribe-editor__ticket__sku-label-with-tooltip"
					forId={ this.id }
					isLabel={ true }
					label={ __( 'Ticket SKU', 'events-gutenberg' ) }
					tooltipText={ __(
						'A unique identifying code for each ticket type you\'re selling',
						'events-gutenberg',
					) }
					tooltipLabel={ <Dashicon icon="info-outline" /> }
				/>
				<Input
					className="tribe-editor__ticket__sku-input"
					id={ this.id }
					type="text"
					value={ value }
					onChange={ onChange }
				/>
			</div>
		);
	}
}

export default SKU;
