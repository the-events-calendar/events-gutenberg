/**
 * External dependencies
 */
import React from 'react';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import './style.pcss';

/**
 * Module Code
 */

const Upsell = () => (
	<div className="tribe-editor__subtitle__footer-upsell">
		<p className="tribe-editor__subtitle__footer-upsell-text">
			{ __(
				`Turbo charge your events calendar with nifty features like
				recurring events, tickets, imports, event submission, filters,
				and more! `,
				'events-gutenberg'
			) }
			<a
				href="https://theeventscalendar.com/products/804/?utm_campaign=in-app&utm_medium=plugin-tec&utm_source=post-editor"
				className="tribe-editor__subtitle__footer-upsell-link"
				target="_blank"
				rel="noopener noreferrer"
			>
				{ __( 'Check out our add-ons.', 'events-gutenberg' ) }
			</a>
		</p>
	</div>
);

export default Upsell;
