/**
 * External dependencies
 */
import React, { Fragment, PureComponent } from 'react';
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
import { Checkbox } from '@moderntribe/common/elements';
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
			min="0"
			type="number"
			value={ capacity }
		/>
		<Checkbox
			checked={ notGoingResponses }
			className="tribe-editor__rsvp-container-content__not-going-responses"
			id={ notGoingId }
			label={ __( 'Enable Not Going responses', 'events-gutenberg' ) }
		/>
	</div>
);

RSVPContainerContentOptions.propTypes = {
	capacity: PropTypes.string,
	capacityId: PropTypes.string.isRequired,
	notGoingId: PropTypes.string.isRequired,
	notGoingResponses: PropTypes.bool,
};

class RSVPContainerContent extends PureComponent {
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
