/**
 * External dependencies
 */
import { connect } from 'react-redux';
import { compose } from 'redux';
import moment from 'moment';

/**
 * Internal dependencies
 */
import RSVP from './template';
import { selectors } from '@moderntribe/tickets/data/blocks/rsvp';
import { withStore } from '@moderntribe/common/hoc';

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

const mapStateToProps = ( state ) => ( {
	created: selectors.getRSVPCreated( state ),
	isInactive: getIsInactive( state ),
} );

export default compose(
	withStore(),
	connect( mapStateToProps ),
)( RSVP );
