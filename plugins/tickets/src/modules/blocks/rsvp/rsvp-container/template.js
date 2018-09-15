/**
 * External dependencies
 */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { ContainerPanel } from '@moderntribe/tickets/elements';
import RSVPContainerHeader from '@moderntribe/tickets/blocks/rsvp/rsvp-container-header/container';
import { RSVPActive, RSVPInactive } from '@moderntribe/tickets/icons';
import './style.pcss';

const RSVPContainerSectionLeft = () => {
	// TODO: logic to show RSVPInactive

	return (
		<Fragment>
			<RSVPActive />
			<span className="tribe-editor__rsvp-container__section-left-label">
				{ __( 'RSVP', 'events-gutenberg' ) }
			</span>
		</Fragment>
	);
};

const RSVPContainer = ( {
	showContent,
} ) => {
	return (
		<ContainerPanel
			className="tribe-editor__rsvp-container"
			leftSection={ <RSVPContainerSectionLeft /> }
			rightSectionHeader={ <RSVPContainerHeader /> }
			rightSectionContent={ '' }
			showContent={ showContent }
		/>
	);
};

RSVPContainer.propTypes = {
	showContent: PropTypes.bool.isRequired,
};

export default RSVPContainer;
