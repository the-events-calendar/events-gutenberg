/**
 * External dependencies
 */
import { connect } from 'react-redux';
import { compose } from 'redux';
import moment from 'moment';

/**
 * WordPress dependencies
 */
import { withSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import RSVP from './template';
import {
	actions,
	selectors,
	thunks
} from '@moderntribe/tickets/data/blocks/rsvp';
import { withStore, withSaveData } from '@moderntribe/common/hoc';

const getDateTimeMoment = ( date, time ) => {
	const [ hours, minutes ] = time.split( ':' );
	return moment( date ).hours( hours ).minutes( minutes );
};

const getIsInactive = ( state ) => {
	const startDateObj = selectors.getRSVPStartDateObj( state );
	const startTime = selectors.getRSVPStartTime( state );
	const endDateObj = selectors.getRSVPEndDateObj( state );
	const endTime = selectors.getRSVPEndTime( state );

	if ( ! startDateObj || ! endDateObj ) {
		return false;
	}

	const startMoment = getDateTimeMoment( startDateObj, startTime );
	const endMoment = getDateTimeMoment( endDateObj, endTime );
	const currentMoment = moment();

	return ! ( currentMoment.isAfter( startMoment ) && currentMoment.isBefore( endMoment ) );
};

const mapSelectToProps = ( select ) => ( {
	postId: select( 'core/editor' ).getCurrentPostId(),
} );

const mapStateToProps = ( state ) => ( {
	created: selectors.getRSVPCreated( state ),
	rsvpId: selectors.getRSVPId( state ),
	isInactive: getIsInactive( state ),
	isLoading: selectors.getRSVPLoading( state ),
} );

/* @todo: add set initial state */

const mapDispatchToProps = ( dispatch, ownProps ) => ( {
	dispatch,
	setInitialState: () => {
		dispatch( thunks.getRSVP( ownProps.postId ) )
	},
} );

const mergeProps = ( stateProps, dispatchProps, ownProps ) => {
	const { rsvpId, ...restStateProps } = stateProps;
	const { dispatch, ...restDispatchProps } = dispatchProps;

	return {
		...ownProps,
		...restStateProps,
		...restDispatchProps,
		deleteRSVP: () => {
			dispatch( actions.deleteRSVP() );
			if ( stateProps.created && rsvpId ) {
				dispatch( thunks.deleteRSVP( rsvpId ) );
			}
		},
	};
};

export default compose(
	withStore(),
	withSelect( mapSelectToProps ),
	connect( mapStateToProps, mapDispatchToProps, mergeProps ),
	withSaveData(),
)( RSVP );
