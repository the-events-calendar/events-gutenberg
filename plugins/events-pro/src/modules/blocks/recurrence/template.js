/**
 * External dependencies
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';

/**
 * Internal Dependencies
 */
import { constants } from '@moderntribe/common/data/plugins';
import { PluginBlockHooks } from '@moderntribe/common/components';
import AddField from '@moderntribe/events-pro/elements/add-field/element';

const PLUGIN_TEMPLATES = {
	[ constants.EVENTS_PRO_PLUGIN ]: [
		[ 'tribe/event-pro-recurrence-rule', {}],
		[ 'tribe/event-pro-recurrence-exception', {}],
	],
};

export default class RecurringEntry extends PureComponent {
	static propTypes = {
		isRepeatBlockVisible: PropTypes.bool.isRequired,
		initialRepeatBlockClick: PropTypes.func.isRequired,
		syncRulesFromDB: PropTypes.func.isRequired,
		syncExceptionsFromDB: PropTypes.func.isRequired,
		attributes: PropTypes.shape( {
			rules: PropTypes.string,
			exceptions: PropTypes.string,
		} ),
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
			this.props.isRepeatBlockVisible
				? (
					<PluginBlockHooks
						pluginTemplates={ PLUGIN_TEMPLATES }
						templateLock="all"
					/>
				)
				: this.renderRepeatEventButton()
		);
	}
}
