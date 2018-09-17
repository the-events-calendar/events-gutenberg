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
import { Accordion } from '@moderntribe/common/elements';
import { AccordionHeader } from '@moderntribe/tickets/elements';
import './style.pcss';
import Duration from '../duration/template';
import SKU from '../sku/template';

class AdvancedOptions extends Component {
	static propTypes = {
		accordionId: PropTypes.string.isRequired,
		contentId: PropTypes.string.isRequired,
		headerId: PropTypes.string.isRequired,
		isActive: PropTypes.bool.isRequired,
		onClick: PropTypes.func.isRequired,
		accordionTitle: PropTypes.string,
	};

	static defaultProps = {
		accordionId: 'ticketsPlaceholder',
		contentId: 'ticketsPlaceholder',
		headerId: 'ticketsPlaceholder',
		isActive: false,
		accordionTitle: __( 'Advanced Options', 'events-gutenberg' ),
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
			<Duration />
			<SKU />
		</Fragment>
	);

	getRows = () => {
		const { accordionId, accordionTitle, contentId, headerId, isActive, onClick } = this.props;

		return [ {
			accordionId,
			content: this.getContent(),
			contentClassName: 'tribe-editor__tickets__advanced-options-content',
			contentId,
			header: <AccordionHeader title={ accordionTitle } active={ isActive } />,
			headerClassName: 'tribe-editor__tickets__advanced-options-header',
			headerId,
			isActive,
			onClick,
		} ];
	};

	render() {
		return (
			<Accordion
				className="tribe-editor__tickets__advanced-options"
				rows={ this.getRows() }
			/>
		)
	}
};

export default AdvancedOptions;
