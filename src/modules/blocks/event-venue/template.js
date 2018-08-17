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
		onCreateNew: PropTypes.func,
		removeVenue: PropTypes.func,
		editVenue: PropTypes.func,
	};

	componentDidUpdate( prevProps ) {
		const { isSelected, edit, create, setSubmit } = this.props;
		const unSelected = prevProps.isSelected && ! isSelected;
		if ( unSelected && ( edit || create ) ) {
			setSubmit();
		}
	}

	componentWillUnmount() {
		// TODO: this does not work as intended. If one deletes a block, then adds
		// another block, the venue id persists because of the setInitialState()
		// function. This will perform as intended once setInitialState() is
		// removed.
		this.props.removeVenue();
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
		const {
			isSelected,
			edit,
			create,
			isLoading,
			submit,
			volatile,
			editVenue
		} = this.props;

		const idle = edit || create || isLoading || submit;
		if ( ! this.hasVenue() || ! isSelected || ! volatile || idle ) {
			return null;
		}

		return (
			<button onClick={ editVenue }>
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
		const { isSelected, store, name, onItemSelect, onCreateNew } = this.props;
		return (
			<SearchOrCreate
				name={ name }
				icon={ <VenueIcon /> }
				store={ store }
				isSelected={ isSelected }
				postType={ VENUE }
				onItemSelect={ onItemSelect }
				onCreateNew={ onCreateNew }
				placeholder={ __( 'Add or find a venue', 'events-gutenberg' ) }
			/>
		);
	}

	renderContainer() {
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

	renderRemoveAction() {
		const {
			isSelected,
			edit,
			create,
			isLoading,
			submit,
			removeVenue
		} = this.props;

		if ( ! this.hasVenue() || ! isSelected || edit || create || isLoading || submit ) {
			return null;
		}

		return (
			<div className="tribe-editor__venue__actions">
				<button
					className="tribe-editor__venue__actions--close"
					onClick={ removeVenue }
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
				{ this.renderContainer() }
				{ this.renderMap() }
				{ this.renderRemoveAction() }
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
				<PanelBody title={ __( 'Venue Settings' ) }>
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

	// TODO: this hasVenue is coupled to the existence of details, not the venue ID.
	// Given how withDetails is currently tightly coupled with the state, this cannot
	// be moved to the container. withDetails should be decoupled from state.
	hasVenue() {
		const { details } = this.props;
		return ! isEmpty( details );
	}

	// TODO: this function cannot be moved to container as it depends on hasVenue().
	// Once withDetails is decoupled from state, this should move to container.
	maybeEdit = () => {
		const { volatile, editVenue } = this.props;
		if ( this.hasVenue() && volatile ) {
			return editVenue;
		}
	}
}

export default EventVenue;
