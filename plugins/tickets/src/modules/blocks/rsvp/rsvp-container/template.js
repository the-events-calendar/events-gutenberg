/**
 * External dependencies
 */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import { ContainerPanel } from '@moderntribe/tickets/elements';
import { RSVPActive, RSVPInactive } from '@moderntribe/tickets/icons';

const RSVPContainerSectionLeft = () => {
	// TODO: logic to show RSVPInactive

	return (
		<Fragment>
			<RSVPActive />
			<span className="tribe-editor__rsvp-container__section-left">
				{ __( 'RSVP', 'events-gutenberg' ) }
			</span>
		</Fragment>
	);
};

const RSVPContainer = ( {
	showContent,
} ) => {
	<ContainerPanel
		className="tribe-editor__rsvp-container"
		leftSection={ <RSVPContainerSectionLeft /> }
		rightSectionHeader={ '' }
		rightSectionContent={ '' }
		showContent={ showContent }
	/>
};

RSVPContainer.propTypes = {
	showContent: PropTypes.bool.isRequired,
};

export default RSVPContainer;
