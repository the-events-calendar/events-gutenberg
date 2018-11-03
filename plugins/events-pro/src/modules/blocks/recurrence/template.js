/**
 * External dependencies
 */
import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';

/**
 * Internal Dependencies
 */
import { constants } from '@moderntribe/common/data/plugins';
import { PluginBlockHooks } from '@moderntribe/common/components';
import AddField from '@moderntribe/events-pro/elements/add-field/element';
import AttributeSync from '@moderntribe/events-pro/elements/attribute-sync/element';
import * as exception from '@moderntribe/events-pro/data/blocks/exception';
import * as recurring from '@moderntribe/events-pro/data/blocks/recurring';

const PLUGIN_TEMPLATES = {
	[ constants.EVENTS_PRO_PLUGIN ]: [
		[ 'tribe/event-pro-recurrence-rule', {}],
		[ 'tribe/event-pro-recurrence-exception', {}],
	],
};

export default class RecurringEntry extends PureComponent {
	static propTypes = {
		attributes: PropTypes.shape( {
			rules: PropTypes.string,
			exceptions: PropTypes.string,
		} ),
		clientId: PropTypes.string.isRequired,
		hasExceptions: PropTypes.bool.isRequired,
		hasRules: PropTypes.bool.isRequired,
		initialRepeatBlockClick: PropTypes.func.isRequired,
		isRepeatBlockVisible: PropTypes.bool.isRequired,
		setAttributes: PropTypes.func.isRequired,
		syncExceptionsFromDB: PropTypes.func.isRequired,
		syncRulesFromDB: PropTypes.func.isRequired,
	}

	componentDidMount() {
		const { rules, exceptions } = this.props.attributes;
		rules && this.props.syncRulesFromDB( rules );
		exceptions && this.props.syncExceptionsFromDB( exceptions );
	}

	renderRepeatEventButton() {
		return (
			<AddField onClick={ this.props.initialRepeatBlockClick }>
				{ __( 'Repeat This Event', 'events-gutenberg' ) }
			</AddField>
		);
	}

	render() {
		return (
			<Fragment>
				{
					this.props.isRepeatBlockVisible ||
					this.props.hasRules ||
					this.props.hasExceptions
						? (
							<PluginBlockHooks
								pluginTemplates={ PLUGIN_TEMPLATES }
								templateLock="all"
							/>
						)
						: this.renderRepeatEventButton()
				}

				<AttributeSync
					setAttributes={ this.props.setAttributes }
					clientId={ this.props.clientId }
					metaField="exceptions"
					current={ this.props.attributes.exceptions }
					selector={ exception.selectors.getExceptions }
					listeners={ [
						exception.types.ADD_EXCEPTION,
						exception.types.EDIT_EXCEPTION,
						exception.types.REMOVE_EXCEPTION,
					] }
				/>

				<AttributeSync
					setAttributes={ this.props.setAttributes }
					clientId={ this.props.clientId }
					metaField="rules"
					selector={ recurring.selectors.getRules }
					current={ this.props.attributes.rules }
					listeners={ [
						recurring.types.ADD_RULE,
						recurring.types.EDIT_RULE,
						recurring.types.REMOVE_RULE,
					] }
				/>
			</Fragment>
		);
	}
}
