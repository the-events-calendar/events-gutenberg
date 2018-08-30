/**
 * External dependencies
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import ExceptionForm from '@moderntribe/events-pro/elements/exception-form/element';
import ExceptionAddField from '@moderntribe/events-pro/elements/exception-add-field/element';
import Panel from '@moderntribe/events-pro/elements/panel/element';

export default class EventRecurring extends PureComponent {
	static propTypes = {
		isExceptionPanelExpanded: PropTypes.bool.isRequired,
		isExceptionPanelVisible: PropTypes.bool.isRequired,
		toggleExceptionPanelExpand: PropTypes.func.isRequired,
		toggleExceptionPanelVisibility: PropTypes.func.isRequired,
		initialExceptionPanelClick: PropTypes.func.isRequired,
	}

	render() {
		return (
			this.props.isExceptionPanelVisible
				? (
					<Panel
						onHeaderClick={ this.props.toggleExceptionPanelExpand }
						isExpanded={ this.props.isExceptionPanelExpanded }
						panelTitle={ __( 'Exceptions', 'events-gutenberg' ) }
					>
						<ExceptionForm />
						<ExceptionAddField noBorder />
					</Panel>
				)
				: <ExceptionAddField onClick={ this.props.initialExceptionPanelClick } />
		);
	}
}
