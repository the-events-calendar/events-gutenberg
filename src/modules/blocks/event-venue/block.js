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

import withSaveData from 'editor/hoc/with-save-data';
import VenueDetails from './venue';
import VenueIcon from 'icons/venue.svg';
import CloseIcon from 'icons/close.svg';
import { actions } from 'data/blocks/venue';

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
		coordinates: PropTypes.object,
		address: PropTypes.object,
		draft: PropTypes.object,
		showMap: PropTypes.bool,
		showMapLink: PropTypes.bool,
		createDraft: PropTypes.func,
		editDraft: PropTypes.func,
		removeDraft: PropTypes.func,
		setDetails: PropTypes.func,
		setDraftTitle: PropTypes.func,
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
		const { isSelected, edit, create, sendForm } = this.props;
		const unSelected = prevProps.isSelected && ! isSelected;
		if ( unSelected && ( edit || create ) ) {
			sendForm();
		}

		const { venue, venueID, setAttributes } = this.props;
		if ( venueID !== venue ) {
			setAttributes( { venue: venueID } );
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
		const { showMapLink, details, address } = this.props;

		return (
			<VenueDetails
				venue={ details }
				address={ address }
				showMapLink={ showMapLink }
				afterTitle={ this.renderEditAction() }
				maybeEdit={ this.maybeEdit }
			/>
		);
	}

	renderSearchOrCreate() {
		const { isSelected, store, name } = this.props;
		return (
			<SearchOrCreate
				name={ name }
				icon={ <VenueIcon /> }
				store={ store }
				selected={ isSelected }
				postType={ VENUE }
				onSelection={ this.setVenue }
				onSetCreation={ this.setDraftTitle }
				placeholder={ __( 'Add or find a location', 'events-gutenberg' ) }
			/>
		);
	}

	renderForm = () => {
		const { draft } = this.props;
		return (
			<VenueForm
				{ ...toFields( draft ) }
				onSubmit={ this.onSubmit }
			/>
		);
	};

	onSubmit = ( fields ) => {
		const { edit, create, editDraft, createDraft } = this.props;
		if ( edit ) {
			editDraft( fields );
		} else if ( create ) {
			createDraft( fields );
		}
	};

	setVenue = ( venue ) => {
		const { setDetails } = this.props;
		setDetails( venue );
	};

	setDraftTitle = ( title ) => {
		const { clear, setDraftTitle } = this.props;
		clear();
		setDraftTitle( title );
	};

	hasVenue() {
		const { details } = this.props;
		return ! isEmpty( details );
	}

	renderMap() {
		const { details, address, coordinates, edit, create, loading, submit, showMap } = this.props;

		if ( ! showMap || isEmpty( details ) || edit || create || loading || submit ) {
			return null;
		}

		return (
			<GoogleMap
				size={ { width: 450, height: 353 } }
				coordinates={ coordinates }
				address={ addressToMapString( address ) }
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
		const { status, volatile } = details;
		return 'draft' === status && volatile;
	}

	removeVenue = () => {
		const { details } = this.props;
		const { id, volatile } = details;
		const { clear, removeDraft } = this.props;

		if ( id && volatile ) {
			removeDraft();
		} else {
			clear();
		}
	};

	edit = () => {
		this.props.setDraftDetails();
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

const mapStateToProps = ( state, props ) => ( {} );

const mapDispatchToProps = ( dispatch ) => bindActionCreators( actions, dispatch );

export default compose(
	connect(
		mapStateToProps,
		mapDispatchToProps,
	),
	withSaveData(),
)( EventVenue );

/*
export default compose( [
	withSelect( ( select, props ) => {
		const { venue } = props;
		const {
			getDetails,
			get,
		} = select( VENUE_STORE_NAME );

		return {
			details: getDetails( venue ),
			address: get( 'address' ),
			coordinates: get( 'coordinates' ),
			draft: get( 'draft' ),
			edit: get( 'edit' ),
			create: get( 'create' ),
			loading: get( 'loading' ),
			submit: get( 'submit' ),
			venueID: get( 'id' ),
		};
	} ),
	withDispatch( ( dispatch, props ) => {
		const {
			clear,
			setDraftDetails,
			createDraft,
			editDraft,
			removeDraft,
			setDetails,
			setDraftTitle,
			submit,
		} = dispatch( VENUE_STORE_NAME );
		return {
			clear,
			setDraftDetails() {
				const { details } = props;
				setDraftDetails( details );
			},
			createDraft( fields ) {
				createDraft( toVenue( fields ) );
			},
			editDraft( fields ) {
				const { draft } = props;
				const { id } = draft;
				editDraft( id, toVenue( fields ) );
			},
			removeDraft() {
				const { details } = props;
				const { id } = details;
				removeDraft( id );
			},
			setDetails( venue ) {
				setDetails( venue.id, venue );
			},
			setDraftTitle,
			sendForm: submit,
		};
	} ),
] )( EventVenue );*/
