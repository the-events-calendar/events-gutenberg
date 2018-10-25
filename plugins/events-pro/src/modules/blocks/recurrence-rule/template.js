/**
 * External dependencies
 */
import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import RecurringForm from '@moderntribe/events-pro/elements/recurring-form/element';
import RecurringAddField from '@moderntribe/events-pro/elements/recurring-add-field/element';
import Panel from '@moderntribe/events-pro/elements/panel/element';
import AttributeSync from '@moderntribe/events-pro/elements/attribute-sync/element';
import { getRules } from '@moderntribe/events-pro/data/blocks/recurring/selectors';
import * as types from '@moderntribe/events-pro/data/blocks/recurring/types';

export default class EventRecurring extends PureComponent {
	static propTypes = {
		addField: PropTypes.func.isRequired,
		clientId: PropTypes.string.isRequired,
		hasRules: PropTypes.bool.isRequired,
		initialRulePanelClick: PropTypes.func.isRequired,
		isRulePanelExpanded: PropTypes.bool.isRequired,
		isRulePanelVisible: PropTypes.bool.isRequired,
		removeRule: PropTypes.func.isRequired,
		rules: PropTypes.array.isRequired,
		setAttributes: PropTypes.func.isRequired,
		toggleRulePanelExpand: PropTypes.func.isRequired,
	}

	render() {
		return (
			<Fragment>
				{
					this.props.isRulePanelVisible ||
					this.props.hasRules
						? (
							<Panel
								onHeaderClick={ this.props.toggleRulePanelExpand }
								isExpanded={ this.props.isRulePanelExpanded }
								panelTitle={ __( 'Recurrence Rules', 'events-gutenberg' ) }
							>
								<RecurringForm
									rules={ this.props.rules }
									removeRule={ this.props.removeRule }
								/>
								<RecurringAddField onClick={ this.props.addField } noBorder />
							</Panel>
						)
						: <RecurringAddField onClick={ this.props.initialRulePanelClick } />

				}
				<AttributeSync
					setAttributes={ this.props.setAttributes }
					clientId={ this.props.clientId }
					metaField="rules"
					selector={ getRules }
					listeners={ [
						types.ADD_RULE,
						types.EDIT_RULE,
						types.REMOVE_RULE,
					] }
				/>
			</Fragment>
		);
	}
}
