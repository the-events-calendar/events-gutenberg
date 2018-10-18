/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import { sprintf } from 'sprintf-js';

/**
 * Wordpress dependencies
 */
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { InspectorControls } from '@wordpress/editor';

const Settings = ( { name, before, after, settingsLink } ) => (
	<InspectorControls key="inspector">
		{ before }
		<PanelBody title={ sprintf( __( '%1$s Settings', 'events-gutenberg' ), name ) }>
			{ ! ! settingsLink && (
				<span>
					{ __( 'Adjust this block’s options under Events → Settings → ', 'events-gutenberg' ) }
					<a href={ settingsLink } target="_blank" rel="noreferrer noopener">
						{ __( 'Additional Fields', 'events-gutenberg' ) }
					</a>
				</span>
			) }
		</PanelBody>
		{ after }
	</InspectorControls>
);

Settings.propTypes = {
	before: PropTypes.node,
	name: PropTypes.string.isRequired,
	settingsLink: PropTypes.string,
	after: PropTypes.node,
};

export default Settings;
