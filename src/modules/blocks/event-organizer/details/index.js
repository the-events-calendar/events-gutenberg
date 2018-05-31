/**
 * External dependencies
 */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';

/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';
import { Dashicon } from '@wordpress/components';
import { toFields } from 'elements/organizer-form/utils';
import './style.pcss';

/**
 * Internal dependencies
 */

export default class OrganizerDetails extends Component {
	static defaultProps = {
		organizer: {},
		edit: noop,
		remove: noop,
		selected: false,
	};

	static propTypes = {
		organizer: PropTypes.object,
		edit: PropTypes.func,
		remove: PropTypes.func,
		selected: PropTypes.bool,
	};

	constructor( props ) {
		super( ...arguments );
		this.state = {
			...props,
		};
	}

	render() {
		return (
			<div className="tribe-event-organizer__details">
				{ this.renderDetails() }
				{ this.renderActions() }
			</div>
		);
	}

	renderDetails() {
		const { organizer } = this.props;
		const fields = toFields( organizer );
		const { title, website, email, phone } = fields;
		return (
			<Fragment>
				<h3 dangerouslySetInnerHTML={ { __html: title } } />
				{ phone && <p>{ phone }</p> }
				{ website && <p>{ website }</p> }
				{ email && <p>{ email }</p> }
			</Fragment>
		);
	}

	renderActions() {
		const { edit, remove, selected } = this.props;

		if ( ! selected ) {
			return null;
		}

		return (
			<div className="tribe-event-organizer__actions">
				{ this.isDraft() && <button onClick={ edit }><Dashicon icon="edit" /></button> }
				<button onClick={ remove }><Dashicon icon="trash" /></button>
			</div>
		)
	}

	isDraft() {
		const { organizer } = this.props;
		return 'draft' === organizer.status;
	}
}
