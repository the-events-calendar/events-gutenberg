/**
 * External dependencies
 */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import uniqid from 'uniqid';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import RSVPAdvancedOptions from '@moderntribe/tickets/blocks/rsvp/rsvp-advanced-options/container';
import './style.pcss';

const RSVPContainerContentLabels = () => (
	<div className="tribe-editor__rsvp-container-content__labels">
		<span className="tribe-editor__rsvp-container-content__capacity-label">
			{ __( 'RSVP Capacity', 'events-gutenberg' ) }
		</span>
		<span className="tribe-editor__rsvp-container-content__capacity-label-help">
			{ __( 'Leave blank if unlimited', 'events-gutenberg' ) }
		</span>
	</div>
);

const RSVPContainerContentOptions = ( {
	capacity,
	capacityId,
	notGoingId,
	notGoingResponses
} ) => (
	<div className="tribe-editor__rsvp-container-content__options">
		<input
			className="tribe-editor__rsvp-container-content__capacity-input"
			id={ capacityId }
			type="number"
			value={ capacity }
		/>
		<div className="tribe-editor__rsvp-container-content__not-going-responses">
			<input
				className="tribe-editor__rsvp-container-content__not-going-responses-checkbox"
				id={ notGoingId }
				min="0"
				type="checkbox"
				value={ notGoingResponses }
			/>
			<label
				className="tribe-editor__rsvp-container-content__not-going-responses-label"
				for={ notGoingId }
			>
				{ __( 'Enable Not Going responses', 'events-gutenberg' ) }
			</label>
		</div>
	</div>
);

RSVPContainerContentOptions.propTypes = {
	capacity: PropTypes.string,
	capacityId: PropTypes.string.isRequired,
	notGoingId: PropTypes.string.isRequired,
	notGoingResponses: PropTypes.bool,
};

class RSVPContainerContent extends Component {
	static propTypes = {
		capacity: PropTypes.string,
		notGoingResponses: PropTypes.bool,
	}

	constructor( props ) {
		super( props );
		this.capacityId = uniqid();
		this.notGoingId = uniqid();
	}

	render() {
		const { capacity, notGoingResponses } = this.props;
		const optionsProps = {
			capacity,
			capacityId: this.capacityId,
			notGoingId: this.notGoingId,
			notGoingResponses,
		}

		return (
			<Fragment>
				<RSVPContainerContentLabels />
				<RSVPContainerContentOptions { ...optionsProps } />
				<RSVPAdvancedOptions />
			</Fragment>
		);
	}
}

export default RSVPContainerContent;
