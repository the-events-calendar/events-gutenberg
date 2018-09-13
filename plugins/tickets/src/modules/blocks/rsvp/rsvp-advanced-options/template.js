/**
 * External dependencies
 */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

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
		accordionId: PropTypes.string.isRequired,
		contentId: PropTypes.string.isRequired,
		headerId: PropTypes.string.isRequired,
		isActive: PropTypes.bool.isRequired,
		onClick: PropTypes.func.isRequired,
	};

	static defaultProps = {
		accordionId: 'placeholder',
		contentId: 'placeholder',
		headerId: 'placeholder',
		isActive: false,
		onClick: () => {},
	};

	componentDidMount() {
		// dispatch action here to create object with accordion state
	}

	componentWillUnmount() {
		// dispatch action here to delete object with accordion state
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
		const { contentId, headerId, isActive, onClick } = this.props;

		return [ {
			content: this.getContent(),
			contentClassName: 'tribe-editor__rsvp__advanced-options-content',
			contentId,
			header: this.getHeader(),
			headerClassName: 'tribe-editor__rsvp__advanced-options-header',
			headerId,
			isActive,
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
