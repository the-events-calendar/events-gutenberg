/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { addressToMapString } from 'utils/geo-data';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import './style.pcss';

import {
	Spinner,
	Placeholder,
	ToggleControl,
	PanelBody,
	Dashicon,
} from '@wordpress/components';

import {
	InspectorControls,
} from '@wordpress/editor';

/**
 * Internal dependencies
 */
import {
	SearchOrCreate,
	VenueForm,
	toFields,
	toVenue,
	GoogleMap,
} from 'elements';

import { VENUE } from 'editor/post-types';
import { withSaveData, withDetails, withForm } from 'editor/hoc';
import VenueDetails from './venue';
import VenueIcon from 'icons/venue.svg';
import CloseIcon from 'icons/close.svg';
import { actions, selectors, utils } from 'data/blocks/venue';

/**
 * Module Code
 */

class EventVenue extends Component {

	static propTypes = {
		venue: PropTypes.number,
		isSelected: PropTypes.bool,
		loading: PropTypes.bool,
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
		setVenue: PropTypes.func,
		setDraftDetails: PropTypes.func,
		clear: PropTypes.func,
		sendForm: PropTypes.func,
		toggleVenueMap: PropTypes.func,
		toggleVenueMapLink: PropTypes.func,
	};

	constructor() {
		super( ...arguments );
	}

	componentDidUpdate( prevProps = {} ) {
		const { isSelected, edit, create, setSubmit } = this.props;
		const unSelected = prevProps.isSelected && ! isSelected;
		if ( unSelected && ( edit || create ) ) {
			setSubmit();
		}
	}

	componentWillUnmount() {
		this.removeVenue();
	}

	render() {
		return [ this.renderBlock(), this.renderControls() ];
	}

	renderBlock() {
		const { showMap } = this.props;

		const containerClass = classNames(
			{
				'tribe-editor__venue': this.hasVenue(),
				'tribe-editor__venue--has-map': this.hasVenue() && showMap,
			},
		);

		return (
			<div key="event-venue-box" className={ containerClass }>
				{ this.getContainer() }
				{ this.renderMap() }
				{ this.editActions() }
			</div>
		);
	}

	getContainer() {
		const { loading, edit, create, submit } = this.props;

		if ( loading || submit ) {
			return (
				<Placeholder key="loading">
					<Spinner/>
				</Placeholder>
			);
		}

		if ( edit || create ) {
			return this.renderForm();
		}

		return this.hasVenue() ? this.renderDetails() : this.renderSearchOrCreate();
	}

	renderDetails() {
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
		const { isSelected, store, name, setVenue } = this.props;
		return (
			<SearchOrCreate
				name={ name }
				icon={ <VenueIcon /> }
				store={ store }
				selected={ isSelected }
				postType={ VENUE }
				onSelection={ setVenue }
				onSetCreation={ this.setDraftTitle }
				placeholder={ __( 'Add or find a location', 'events-gutenberg' ) }
			/>
		);
	}

	renderForm = () => {
		const { fields } = this.props;
		return (
			<VenueForm
				{ ...toFields( fields ) }
				onSubmit={ this.onSubmit }
			/>
		);
	};

	onSubmit = ( fields ) => {
		const { sendForm, setDetails, setVenue, details } = this.props;
		sendForm(
			toVenue( fields ),
			( body ) => {
				const { id } = body;
				setDetails( id, body );
				setVenue( id );
			},
			details
		);
	};

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

	renderMap() {
		const { details, edit, create, loading, submit, showMap } = this.props;

		if ( ! showMap || isEmpty( details ) || edit || create || loading || submit ) {
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

	maybeEdit = () => {
		if ( this.hasVenue() && this.isDraft() ) {
			return this.edit();
		}
	}

	renderEditAction() {
		const { isSelected, edit, create, loading, submit } = this.props;
		const idle = edit || create || loading || submit;
		if ( ! this.hasVenue() || ! isSelected || ! this.isDraft() || idle ) {
			return null;
		}

		return (
			<button onClick={ this.edit }>
				<Dashicon icon="edit" />
			</button>
		);
	}

	editActions() {
		const { isSelected, edit, create, loading, submit } = this.props;
		if ( ! this.hasVenue() || ! isSelected || edit || create || loading || submit ) {
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

	isDraft() {
		const { details } = this.props;
		const { status } = details;
		return 'draft' === status;
	}

	removeVenue = () => {
		const { details } = this.props;
		const { id, volatile } = details;
		const { removeVenue, removeDraft } = this.props;

		if ( id && volatile ) {
			removeDraft();
		} else {
			removeVenue();
		}
	};

	edit = () => {
		const { details, editEntry } = this.props;
		editEntry( details );
	};

	renderControls() {
		const { showMapLink, showMap, toggleVenueMap, toggleVenueMapLink } = this.props;

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
				</PanelBody>
			</InspectorControls>
		);
	}
}

const mapStateToProps = ( state ) => ( {
	venue: selectors.getVenue( state ),
	showMapLink: selectors.getshowMapLink( state ),
	showMap: selectors.getshowMap( state ),
} );

const mapDispatchToProps = ( dispatch ) => bindActionCreators( actions, dispatch );

export default compose(
	connect(
		mapStateToProps,
		mapDispatchToProps,
	),
	withSaveData(),
	withDetails( 'venue' ),
	withForm( ( props ) => props.name ),
)( EventVenue );
