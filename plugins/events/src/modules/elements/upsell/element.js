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
				'Turbocharge your events with our premium calendar and ticketing add-ons. ',
				'events-gutenberg'
			) }
			<a
				href="http://m.tri.be/1a8q"
				className="tribe-editor__subtitle__footer-upsell-link"
				target="_blank"
				rel="noopener noreferrer"
			>
				{ _x( 'Check \'em out!', 'linked text for plugin add-ons', 'events-gutenberg' ) }
			</a>
		</p>
	</div>
);

export default Upsell;
