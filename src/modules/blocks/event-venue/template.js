/**
 * External dependencies
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { addressToMapString } from 'utils/geo-data';
import classNames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	Spinner,
	Placeholder,
	ToggleControl,
	PanelBody,
	Dashicon,
} from '@wordpress/components';
import { InspectorControls } from '@wordpress/editor';

/**
 * Internal dependencies
 */
import {
	SearchOrCreate,
	VenueForm,
	toFields,
	GoogleMap,
	EditLink,
} from 'elements';
import { VENUE } from 'editor/post-types';
import VenueDetails from './venue';
import VenueIcon from 'icons/venue.svg';
import CloseIcon from 'icons/close.svg';
import { utils } from 'data/blocks/venue';
import './style.pcss';

/**
 * Module Code
 */

class EventVenue extends Component {
	static propTypes = {
		venue: PropTypes.number,
		isSelected: PropTypes.bool,
		isLoading: PropTypes.bool,
		submit: PropTypes.bool,
		edit: PropTypes.bool,
		create: PropTypes.bool,
		details: PropTypes.object,
		draft: PropTypes.object,
		showMap: PropTypes.bool,
		showMapLink: PropTypes.bool,
		createDraft: PropTypes.func,
		editDraft: PropTypes.func,
		removeDraft: PropTypes.func,
		setDraftDetails: PropTypes.func,
		clear: PropTypes.func,
		sendForm: PropTypes.func,
		toggleVenueMap: PropTypes.func,
		toggleVenueMapLink: PropTypes.func,
		onFormSubmit: PropTypes.func,
		onItemSelect: PropTypes.func,
	};

	componentDidUpdate( prevProps ) {
		const { isSelected, edit, create, setSubmit } = this.props;
		const unSelected = prevProps.isSelected && ! isSelected;
		if ( unSelected && ( edit || create ) ) {
			setSubmit();
		}
	}

	componentWillUnmount() {
		this.removeVenue();
	}

	renderForm = () => {
		const { fields, onFormSubmit } = this.props;
		return (
			<VenueForm
				{ ...toFields( fields ) }
				onSubmit={ onFormSubmit }
			/>
		);
	}

	renderEditAction() {
		const { isSelected, edit, create, isLoading, submit, volatile } = this.props;
		const idle = edit || create || isLoading || submit;
		if ( ! this.hasVenue() || ! isSelected || ! volatile || idle ) {
			return null;
		}

		return (
			<button onClick={ this.edit }>
				<Dashicon icon="edit" />
			</button>
		);
	}

	renderDetails = () => {
		const { showMapLink, details } = this.props;
		const { getAddress } = utils;

		return (
			<VenueDetails
				venue={ details }
				address={ getAddress( details ) }
				showMapLink={ showMapLink }
				afterTitle={ this.renderEditAction() }
				maybeEdit={ this.maybeEdit }
			/>
		);
	}

	renderSearchOrCreate() {
		// TODO: The store should not be passed through like this as a prop.
		// Instead, we should hook up the element with a HOC.
		const { isSelected, store, name, onItemSelect } = this.props;
		return (
			<SearchOrCreate
				name={ name }
				icon={ <VenueIcon /> }
				store={ store }
				isSelected={ isSelected }
				postType={ VENUE }
				onItemSelect={ onItemSelect }
				onCreateNew={ this.setDraftTitle }
				placeholder={ __( 'Add or find a venue', 'events-gutenberg' ) }
			/>
		);
	}

	getContainer() {
		const { isLoading, edit, create, submit } = this.props;

		if ( isLoading || submit ) {
			return (
				<Placeholder key="loading">
					<Spinner />
				</Placeholder>
			);
		}

		if ( edit || create ) {
			return this.renderForm();
		}

		return this.hasVenue() ? this.renderDetails() : this.renderSearchOrCreate();
	}

	renderMap() {
		const { details, edit, create, isLoading, submit, showMap } = this.props;

		if ( ! showMap || isEmpty( details ) || edit || create || isLoading || submit ) {
			return null;
		}

		const { getCoordinates, getAddress } = utils;

		return (
			<GoogleMap
				size={ { width: 450, height: 353 } }
				coordinates={ getCoordinates( details ) }
				address={ addressToMapString( getAddress( details ) ) }
				interactive={ true }
			/>
		);
	}

	editActions() {
		const { isSelected, edit, create, isLoading, submit } = this.props;
		if ( ! this.hasVenue() || ! isSelected || edit || create || isLoading || submit ) {
			return null;
		}

		return (
			<div className="tribe-editor__venue__actions">
				<button
					className="tribe-editor__venue__actions--close"
					onClick={ this.removeVenue }
				>
					<CloseIcon />
				</button>
			</div>
		);
	}

	renderBlock() {
		const containerClass = classNames( {
			'tribe-editor__venue': this.hasVenue(),
			'tribe-editor__venue--has-map': this.hasVenue() && this.props.showMap,
		} );

		return (
			<div key="event-venue-box" className={ containerClass }>
				{ this.getContainer() }
				{ this.renderMap() }
				{ this.editActions() }
			</div>
		);
	}

	renderControls() {
		const { venue, showMapLink, showMap, toggleVenueMap, toggleVenueMapLink } = this.props;

		if ( ! this.hasVenue() ) {
			return null;
		}

		return (
			<InspectorControls key="inspector">
				<PanelBody title={ __( 'Venue Map Settings' ) }>
					<ToggleControl
						label={ __( 'Show Google Maps Link' ) }
						checked={ showMapLink }
						onChange={ toggleVenueMapLink }
					/>
					<ToggleControl
						label={ __( 'Show Google Maps Embed' ) }
						checked={ showMap }
						onChange={ toggleVenueMap }
					/>
				<EditLink
					postId={ venue }
					label={ __( 'Edit Venue', 'events-gutenberg' ) }
				/>
				</PanelBody>
			</InspectorControls>
		);
	}

	render() {
		return [ this.renderBlock(), this.renderControls() ];
	}

	setDraftTitle = ( title ) => {
		const { createDraft } = this.props;
		createDraft( {
			title: {
				rendered: title,
			},
		} );
	};

	hasVenue() {
		const { details } = this.props;
		return ! isEmpty( details );
	}

	maybeEdit = () => {
		const { volatile } = this.props;
		if ( this.hasVenue() && volatile ) {
			return this.edit();
		}
	}

	removeVenue = () => {
		const { volatile, maybeRemoveEntry, removeVenue, details } = this.props;
		removeVenue();
		if ( volatile ) {
			maybeRemoveEntry( details );
		}
	};

	edit = () => {
		const { details, editEntry } = this.props;
		editEntry( details );
	};
}

export default EventVenue;
