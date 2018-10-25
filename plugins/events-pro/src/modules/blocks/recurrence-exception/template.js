/**
 * External dependencies
 */
import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import ExceptionForm from '@moderntribe/events-pro/elements/exception-form/element';
import ExceptionAddField from '@moderntribe/events-pro/elements/exception-add-field/element';
import Panel from '@moderntribe/events-pro/elements/panel/element';

export default class RecurringExceptions extends PureComponent {
	static propTypes = {
		addField: PropTypes.func.isRequired,
		clientId: PropTypes.string.isRequired,
		editException: PropTypes.func.isRequired,
		exceptions: PropTypes.array.isRequired,
		hasExceptions: PropTypes.bool.isRequired,
		initialExceptionPanelClick: PropTypes.func.isRequired,
		isExceptionPanelExpanded: PropTypes.bool.isRequired,
		isExceptionPanelVisible: PropTypes.bool.isRequired,
		removeException: PropTypes.func.isRequired,
		setAttributes: PropTypes.func.isRequired,
		toggleExceptionPanelExpand: PropTypes.func.isRequired,
		toggleExceptionPanelVisibility: PropTypes.func.isRequired,
	}

	render() {
		return (
			<Fragment>
				{
					this.props.isExceptionPanelVisible ||
					this.props.hasExceptions
						? (
							<Panel
								onHeaderClick={ this.props.toggleExceptionPanelExpand }
								isExpanded={ this.props.isExceptionPanelExpanded }
								panelTitle={ __( 'Exceptions', 'events-gutenberg' ) }
							>
								<ExceptionForm
									exceptions={ this.props.exceptions }
									removeException={ this.props.removeException }
									editException={ this.props.editException }
								/>
								<ExceptionAddField onClick={ this.props.addField } noBorder />
							</Panel>
						)
						: <ExceptionAddField onClick={ this.props.initialExceptionPanelClick } />
				}
			</Fragment>
		);
	}
}
