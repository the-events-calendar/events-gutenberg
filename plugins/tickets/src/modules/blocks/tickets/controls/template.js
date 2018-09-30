/**
 * External dependencies
 */
import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';

/**
 * Wordpress dependencies
 */
import { Panel, PanelBody, PanelRow } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/editor';

/**
 * Internal dependencies
 */
import './style.pcss';

const message = __(
	'It looks like you have multiple ecommerce plugins active. We recommend running only one at a time. However, if you need to run multiple, please select which one to use to sell tickets for this event. ',
	'events-gutenberg',
);

const note = __(
	'Note: adjusting this setting will only impact new tickets. Existing tickets will not change. We highly recommend that all tickets for one event use the same ecommerce plugin',
	'events-gutenberg',
)

const Controls = ( { selectedProvider, providers, onProviderChange } ) => {
	const hasManyProviders = providers.length > 1;

	return (
		<InspectorControls key="inspector">
			<PanelBody title={ __( 'Tickets Settings', 'events-gutenberg' ) }>
				<PanelRow>
					<fieldset className="tribe-editor__tickets-controls-provider">
						{ hasManyProviders && (
							<legend>{ __( 'Sell tickets using', 'events-gutenberg' ) }</legend>
						) }

						{ hasManyProviders && (
							<p>
								{ message }
								<em>{ note }</em>
							</p>
						) }

						{ hasManyProviders && providers.map( ( provider, key ) => {
							const inputProps = {};
							if ( selectedProvider === provider.class ) {
								inputProps.checked = true;
							}
							return (
								<div>
									<input
										type="radio"
										id={ provider.class }
										name={ provider.class }
										onChange={ onProviderChange }
										{ ...inputProps }
									/>
									<label htmlFor={ provider.class }>{ provider.name }</label>
								</div>
							);
						} ) }
					</fieldset>
				</PanelRow>
			</PanelBody>
		</InspectorControls>
	);
};

Controls.propTypes = {
	selectedProvider: PropTypes.string,
	providers: PropTypes.arrayOf( PropTypes.shape( {
		name: PropTypes.string,
		class: PropTypes.string,
	} ) ),
	onProviderChange: PropTypes.func,
}

Controls.defaultProps = {
	providers: [],
	onProviderChange: () => {},
}

export default Controls;
