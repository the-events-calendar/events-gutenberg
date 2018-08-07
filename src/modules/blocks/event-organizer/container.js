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
import Organizer from './template';

/**
 * Module Code
 */

const mapStateToProps = ( state, props ) => {
	return {
		organizer: selectors.getOrganizerInBlock( state, props ),
		organizers: selectors.getOrganizersInClassic( state ),
	};
};

const mapDispatchToProps = ( dispatch ) => {
	return {
		...bindActionCreators( actions, dispatch ),
		...bindActionCreators( detailsActions, dispatch ),
		setInitialState( { id, get } ) {
			const organizer = get( 'organizer', '' );
			if ( ! organizer ) {
				return;
			}
			dispatch( actions.addOrganizerInBlock( id, organizer ) );
			dispatch( actions.addOrganizerInClassic( organizer ) );
		},
	};
};

export default compose(
	withStore( { isolated: true, postType: ORGANIZER } ),
	connect(
		mapStateToProps,
		mapDispatchToProps,
	),
	withDetails( 'organizer' ),
	withSaveData(),
	withForm( ( props ) => props.id ),
)( Organizer );
