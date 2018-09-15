/**
 * External dependencies
 */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

const RSVPContainerContent = ( {

} ) => {
	return (
		<Fragment>
			<div className="tribe-editor__rsvp-container-content__labels">
				<span className="tribe-editor__rsvp-container-content__capacity-label">
					{ __( 'RSVP Capacity', 'events-gutenberg' ) }
				</span>
				<span className="tribe-editor__rsvp-container-content__capacity-label-help">
					{ __( 'Leave blank if unlimited', 'events-gutenberg' ) }
				</span>
			</div>
		</Fragment>
	)
};

