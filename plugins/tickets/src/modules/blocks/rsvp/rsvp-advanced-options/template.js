/**
 * External dependencies
 */
import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import uniqid from 'uniqid';

/**
 * WordPress dependencies
 */
import { Dashicon } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import RSVPDuration from '../rsvp-duration/template';
import RSVPAttendeeRegistration from '../rsvp-attendee-registration/template';
import { Accordion } from '@moderntribe/common/elements';
import './style.pcss';

class RSVPAdvancedOptions extends PureComponent {
	static propTypes = {
		addAccordion: PropTypes.func.isRequired,
		removeAccordion: PropTypes.func.isRequired,
	};

	constructor( props ) {
		super( props );
		this.accordionId = uniqid();
	}

	componentDidMount() {
		this.props.addAccordion( this.accordionId );
	}

	componentWillUnmount() {
		this.props.removeAccordion( this.accordionId );
	}

	getContent = () => (
		<Fragment>
			<RSVPDuration />
			<RSVPAttendeeRegistration />
		</Fragment>
	);

	getHeader = () => (
		<Fragment>
			<Dashicon
				className="tribe-editor__rsvp__advanced-options-header-icon"
				icon="arrow-down"
			/>
			<span className="tribe-editor__rsvp__advanced-options-header-text">
				{ __( 'Advanced Options', 'events-gutenberg' ) }
			</span>
		</Fragment>
	);

	getRows = () => ( [ {
		accordionId: this.accordionId,
		content: this.getContent(),
		contentClassName: 'tribe-editor__rsvp__advanced-options-content',
		header: this.getHeader(),
		headerClassName: 'tribe-editor__rsvp__advanced-options-header',
	} ] );

	render() {
		return (
			<Accordion
				className="tribe-editor__rsvp__advanced-options"
				rows={ this.getRows() }
			/>
		)
	}
};

export default RSVPAdvancedOptions;
