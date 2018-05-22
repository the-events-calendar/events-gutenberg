/**
 * External dependencies
 */
import { noop, trim, isEmpty } from 'lodash';
import classNames from 'classnames';
import React from 'react';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';

import {
	Dropdown,
	IconButton,
	Dashicon,
	ToggleControl,
	TextControl,
	PanelBody,
} from '@wordpress/components';

import {
	InspectorControls,
} from '@wordpress/editor';

/**
 * Internal dependencies
 */
import { getSetting } from 'editor/settings';
import './style.pcss';

import {
	TermsList,
} from 'elements';

/**
 * Module Code
 */

export default class EventTags extends Component {
	constructor() {
		super( ...arguments );
	}

	render() {
		return [
			this.renderUI(),
		];
	}

	renderUI() {
		return (
			<section key="event-tags-box" className="tribe-editor-block">
				<div className="tribe-editor__event-tags">
					{ this.renderList() }
				</div>
			</section>
		);
	}

	renderList() {
		const { attributes } = this.props;

		return (
			<TermsList
				slug="tags"
				label={ __( 'Event Tags:', 'events-gutenberg' ) }
				renderEmpty={ __( 'Add tags in document settings', 'events-gutenberg' ) }
			/>
		);
	}

}

