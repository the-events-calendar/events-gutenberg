/**
 * External dependencies
 */
import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import AddField from '@moderntribe/events-pro/elements/add-field/element';
import RecurringForm from '@moderntribe/events-pro/elements/recurring-form/element';
import ExceptionForm from '@moderntribe/events-pro/elements/exception-form/element';
import RecurringAddField from '@moderntribe/events-pro/elements/recurring-add-field/element';
import ExceptionAddField from '@moderntribe/events-pro/elements/exception-add-field/element';
import Panel from '@moderntribe/events-pro/elements/panel/element';

export default class EventRecurring extends PureComponent {
	static propTypes = {
		isExceptionPanelExpanded: PropTypes.bool.isRequired,
		isExceptionPanelVisible: PropTypes.bool.isRequired,
		isRepeatBlockVisible: PropTypes.bool.isRequired,
		isRulePanelExpanded: PropTypes.bool.isRequired,
		isRulePanelVisible: PropTypes.bool.isRequired,
		toggleExceptionPanelExpand: PropTypes.func.isRequired,
		toggleExceptionPanelVisibility: PropTypes.func.isRequired,
		toggleRepeatBlocksVisibility: PropTypes.func.isRequired,
		toggleRulePanelExpand: PropTypes.func.isRequired,
		toggleRulePanelVisibility: PropTypes.func.isRequired,
		initialExceptionPanelClick: PropTypes.func.isRequired,
		initialRepeatBlockClick: PropTypes.func.isRequired,
		initialRulePanelClick: PropTypes.func.isRequired,
	}

	renderRepeatEventButton() {
		return (
			<AddField onClick={ this.props.initialRepeatBlockClick }>
				{ __( 'Repeat This Event', 'events-gutenberg' ) }
			</AddField>
		);
	}

	renderExceptionPanel() {
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

	renderRecurringPanel() {
		return (
			this.props.isRulePanelVisible
				? (
					<Panel
						onHeaderClick={ this.props.toggleRulePanelExpand }
						isExpanded={ this.props.isRulePanelExpanded }
						panelTitle={ __( 'Recurrence Rules', 'events-gutenberg' ) }
					>
						<RecurringForm />
						<RecurringAddField noBorder />
					</Panel>
				)
				: <RecurringAddField onClick={ this.props.initialRulePanelClick } />
		);
	}

	render() {
		return (
			this.props.isRepeatBlockVisible
				? [
					this.renderRecurringPanel(),
					this.renderExceptionPanel(),
				]
				: this.renderRepeatEventButton()
		);
	}
}
