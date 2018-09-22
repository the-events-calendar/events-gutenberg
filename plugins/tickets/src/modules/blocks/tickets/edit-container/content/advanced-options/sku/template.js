/**
 * External dependencies
 */
import React, { PureComponent } from 'react';
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

class SKU extends PureComponent {
	static propTypes = {
		label: PropTypes.string,
		tooltip: PropTypes.string,
		onChange: PropTypes.func.isRequired,
		value: PropTypes.string,
	};

	static defaultProps = {
		label: __( 'Ticket SKU', 'events-gutenberg' ),
		tooltip: __(
			'A unique identifying code for each ticket type you\'re selling',
			'events-gutenberg',
		),
		onChange: noop,
		value: '',
	};

	constructor( props ) {
		super( props );
		this.id = uniqid( 'ticket-sku' );
	}

	render() {
		const { onChange, value, label, tooltip } = this.props;
		return (
			<div className="tribe-editor__container-panel__row">
				<LabelWithTooltip
					className="tribe-editor__container-panel__label"
					forId={ this.id }
					isLabel={ true }
					label={ label }
					tooltipText={ tooltip }
					tooltipLabel={ <Dashicon icon="info-outline" /> }
				/>
				<div className="tribe-editor__container-panel__input-group">
					<input id={ this.id } type="text" value={ value } onChange={ sendValue( onChange ) } />
				</div>
			</div>
		);
	}
}

export default SKU;
