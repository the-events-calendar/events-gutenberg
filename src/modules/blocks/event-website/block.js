/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import classNames from 'classnames';

/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';
import { Dashicon } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { RichText, UrlInput } from '@wordpress/editor';

/**
 * Internal dependencies
 */
import withSaveData from 'editor/hoc/with-save-data';
import * as actions from 'data/blocks/website/actions';
import * as selectors from 'data/blocks/website/selectors';
import './style.pcss';

/**
 * Module Code
 */

const placeholder = __( 'Add Button Text', 'events-gutenberg' );

class EventWebsite extends Component {
	static propTypes = {
		isSelected: PropTypes.bool,
		setWebsite: PropTypes.func,
		setLabel: PropTypes.func,
		attributes: PropTypes.object,
		url: PropTypes.string,
		urlLabel: PropTypes.string,
	};

	constructor() {
		super( ...arguments );
	}

	render() {
		return (
			<div
				key="event-website"
				className="tribe-editor__block tribe-editor__event-website"
			>
				{ this.renderLink() }
			</div>
		);
	}

	renderLink() {
		const { isSelected, urlLabel } = this.props;

		if ( ! isSelected && ! urlLabel ) {
			return this.renderPlaceholder( placeholder );
		}

		return [
			this.renderLabelInput( placeholder ),
			this.renderUrlInput(),
		];
	}

	renderUrlInput() {
		const { isSelected, url, setWebsite } = this.props;

		if ( ! isSelected ) {
			return null;
		}

		return (
			<div key="tribe-events-website-url" className="tribe-editor__event-website__url">
				<Dashicon icon="admin-links" />
				<UrlInput
					autoFocus={ false }
					value={ url }
					onChange={ setWebsite }
				/>
			</div>
		);
	}

	renderLabelInput() {
		const { urlLabel, setLabel } = this.props;
		return (
			<div
				key="tribe-events-website-label"
				className="tribe-editor__event-website__label"
			>
				<RichText
					id="tribe-events-website-link"
					className="tribe-editor__event-website__label-text"
					format="string"
					tagName="h4"
					value={ urlLabel }
					onChange={ setLabel }
					placeholder={ placeholder }
					formattingControls={ [] }
				/>
			</div>
		);
	}

	renderPlaceholder( urlLabel ) {
		const classes = [
			'tribe-editor__event-website__label',
			'tribe-editor__event-website__label--placeholder',
		];
		return (
			<button
				className={ classNames( classes ) }
			>
				{ urlLabel }
			</button>
		);
	}
}

const mapStateToProps = ( state ) => ( {
	url: selectors.getUrl( state ),
	urlLabel: selectors.getLabel( state ),
} );

const mapDispatchToProps = ( dispatch ) => bindActionCreators( actions, dispatch );

export default compose(
	connect(
		mapStateToProps,
		mapDispatchToProps,
	),
	withSaveData(),
)( EventWebsite );
