/**
 * External dependencies
 */
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import { withStore, withSaveData, withDetails, withForm } from 'editor/hoc';
import { actions, selectors } from 'data/blocks/organizers';
import { actions as detailsActions } from 'data/details';
import { ORGANIZER } from 'editor/post-types';
import EventOrganizer from './template';
import { toOrganizer } from 'elements/organizer-form/utils';

/**
 * Module Code
 */

const onFormCompleted = ( dispatchProps, ownProps ) => ( body = {} ) => {
	const {
		setDetails,
		addOrganizerInClassic,
		addOrganizerInBlock
	} = dispatchProps;

	setDetails( body.id, body );
	addOrganizerInClassic( body.id );
	addOrganizerInBlock( ownProps.clientId, body.id );
};

const onFormSubmit = ( dispatchProps, ownProps ) => ( fields ) => (
	ownProps.sendForm( toOrganizer( fields ), onFormCompleted( dispatchProps, ownProps ) )
);

const onItemSelect = ( dispatchProps, ownProps ) => ( organizerID, details ) => {
	const {
		setDetails,
		addOrganizerInClassic,
		addOrganizerInBlock
	} = dispatchProps;

	setDetails( organizerID, details );
	addOrganizerInClassic( organizerID );
	addOrganizerInBlock( ownProps.clientId, organizerID );
};

const onCreateNew = ( ownProps ) => ( title ) => (
	ownProps.createDraft( {
		title: {
			rendered: title,
		},
	} )
);

const mapStateToProps = ( state, ownProps ) => ( {
	organizer: selectors.getOrganizerInBlock( state, ownProps ),
	organizers: selectors.getOrganizersInClassic( state ),
} );

const mapDispatchToProps = ( dispatch ) => ( {
	...bindActionCreators( actions, dispatch ),
	...bindActionCreators( detailsActions, dispatch ),
	setInitialState( { clientId, get } ) {
		const organizer = get( 'organizer', '' );
		if ( ! organizer ) {
			return;
		}
		dispatch( actions.addOrganizerInBlock( clientId, organizer ) );
		dispatch( actions.addOrganizerInClassic( organizer ) );
	},
} );

const mergeProps = ( stateProps, dispatchProps, ownProps ) => {
	return {
		...ownProps,
		...stateProps,
		...dispatchProps,
		onFormSubmit: onFormSubmit( dispatchProps, ownProps ),
		onItemSelect: onItemSelect( dispatchProps, ownProps ),
		onCreateNew: onCreateNew( ownProps ),
	};
};

export default compose(
	withStore( { isolated: true, postType: ORGANIZER } ),
	withForm( ( props ) => props.clientId ),
	connect( mapStateToProps ),
	withDetails( 'organizer' ),
	connect( null, mapDispatchToProps, mergeProps ),
	withSaveData(),
)( EventOrganizer );
