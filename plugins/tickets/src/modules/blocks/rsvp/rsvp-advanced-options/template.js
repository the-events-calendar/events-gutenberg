/**
 * External dependencies
 */
import React, { Component, Fragment } from 'react';
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
import { Accordion } from '@moderntribe/common/elements';
import './style.pcss';

class RSVPAdvancedOptions extends Component {
	static propTypes = {
		onClick: PropTypes.func,
	};

	constructor( props ) {
		super( props );
		this.accordionId = uniqid();
	}

	componentDidMount() {
		// this.props.addAccordion( this.accordionId );
	}

	componentWillUnmount() {
		// this.props.removeAccordion( this.accordionId );
	}

	getContent = () => (
		<Fragment>
			<RSVPDuration />
			{/* @TODO: attendee registration */}
			{/* <RSVPAttendeeRegistration /> */}
		</Fragment>
	);

	getHeader = () => {
		const { isActive } = this.props;
		return (
			<Fragment>
				<Dashicon
					className="tribe-editor__rsvp__advanced-options-header-icon"
					icon={ isActive ? 'arrow-up' : 'arrow-down' }
				/>
				<span className="tribe-editor__rsvp__advanced-options-header-text">
					{ __( 'Advanced Options', 'events-gutenberg' ) }
				</span>
			</Fragment>
		);
	};

	getRows = () => {
		const { onClick } = this.props;

		return [ {
			accordionId: this.accordionId,
			content: this.getContent(),
			contentClassName: 'tribe-editor__rsvp__advanced-options-content',
			header: this.getHeader(),
			headerClassName: 'tribe-editor__rsvp__advanced-options-header',
			onClick,
		} ];
	};

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
