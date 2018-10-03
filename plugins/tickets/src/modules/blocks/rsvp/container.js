/**
 * External dependencies
 */
import { connect } from 'react-redux';
import { compose } from 'redux';
import moment from 'moment';

/**
 * WordPress dependencies
 */
import { select } from '@wordpress/data';

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
import { toMomentFromDateTime } from '@moderntribe/common/utils/moment';

const getIsInactive = ( state ) => {
	const startDateObj = selectors.getRSVPStartDateObj( state );
	const startTime = selectors.getRSVPStartTime( state );
	const endDateObj = selectors.getRSVPEndDateObj( state );
	const endTime = selectors.getRSVPEndTime( state );

	if ( ! startDateObj || ! endDateObj ) {
		return false;
	}

	const startMoment = toMomentFromDateTime( startDateObj, startTime );
	const endMoment = toMomentFromDateTime( endDateObj, endTime );
	const currentMoment = moment();

	return ! ( currentMoment.isAfter( startMoment ) && currentMoment.isBefore( endMoment ) );
};

const setInitialState = ( dispatch, ownProps ) => () => {
	const postId = select( 'core/editor' ).getCurrentPostId();
	dispatch( thunks.getRSVP( postId ) );
	if ( ownProps.attributes.headerImageId ) {
		dispatch( thunks.getRSVPHeaderImage(
			ownProps.attributes.headerImageId
		) );
	}
	if ( ownProps.attributes.goingCount ) {
		dispatch( actions.setRSVPGoingCount(
			parseInt( ownProps.attributes.goingCount, 10 )
		) );
	}
	if ( ownProps.attributes.notGoingCount ) {
		dispatch( actions.setRSVPNotGoingCount(
			parseInt( ownProps.attributes.notGoingCount, 10 )
		) );
	}
};

const mapStateToProps = ( state ) => ( {
	created: selectors.getRSVPCreated( state ),
	rsvpId: selectors.getRSVPId( state ),
	isInactive: getIsInactive( state ),
	isLoading: selectors.getRSVPIsLoading( state ),
} );

const mapDispatchToProps = ( dispatch, ownProps ) => ( {
	dispatch,
	setInitialState: setInitialState( dispatch, ownProps ),
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
	connect( mapStateToProps, mapDispatchToProps, mergeProps ),
	withSaveData(),
)( RSVP );
