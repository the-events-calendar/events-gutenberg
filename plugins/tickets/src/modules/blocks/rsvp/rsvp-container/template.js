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
import { RSVP } from '@moderntribe/tickets/elements/container-panel/element';
import RSVPContainerHeader from '@moderntribe/tickets/blocks/rsvp/rsvp-container-header/container';
import RSVPContainerContent from '@moderntribe/tickets/blocks/rsvp/rsvp-container-content/template';
import { RSVPActive, RSVPInactive } from '@moderntribe/tickets/icons';
import './style.pcss';

const RSVPContainerIcon = () => {
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

const RSVPContainer = () => (
	<ContainerPanel
		className="tribe-editor__rsvp-container"
		layout={ RSVP }
		icon={ <RSVPContainerIcon /> }
		header={ <RSVPContainerHeader /> }
		content={ <RSVPContainerContent /> }
	/>
);

export default RSVPContainer;
