/**
 * External dependencies
 */
import { connect } from 'react-redux';
import { compose } from 'redux';

/**
 * Internal dependencies
 */
import RecurringToDateTimePicker from './template';
import { actions, selectors, } from '@moderntribe/events-pro/data/blocks/recurring';
import { withStore } from '@moderntribe/common/hoc';

const getRecurringMultiDay = ( state, ownProps ) => {

};

const onEndTimeChange = ( dispatchProps, ownProps ) => ( e ) => (
	dispatchProps.editRule( ownProps.index, { end_time: `${ e.target.value }:00` } )
);

const onEndTimeClick = ( dispatchProps, ownProps ) => ( value, onClose ) => {
	const isAllDay = value === 'all-day';
	const payload = {};

	if ( isAllDay ) {
		payload.all_day = true;
		payload.start_time = '00:00:00';
		payload.end_time = '23:59:00';
	} else {
		payload.all_day = false;
		payload.end_time = fromSeconds( value, TIME_FORMAT_HH_MM );
	}

	dispatchProps.editRule( ownProps.index, payload );
	onClose();
};

const onRecurringMultiDayChange = () => {};

const mapStateToProps = ( state, ownProps ) => ( {
	endTime: selectors.getEndTime( state, ownProps ),
	recurringMultiDay: getRecurringMultiDay( state, ownProps ),
} );

const mapDispatchToProps = ( dispatch ) => ( {
	editRule: ( index, payload ) => dispatch( actions.editRule( index, payload ) ),
} );

const mergeProps = ( stateProps, dispatchProps, ownProps ) => ( {
	...ownProps,
	...stateProps,
	onEndTimeChange: onEndTimeChange( dispatchProps, ownProps ),
	onEndTimeClick: onEndTimeClick( dispatchProps, ownProps ),
	onRecurringMultiDayChange,
} );

export default compose(
	withStore(),
	connect( mapStateToProps, mapDispatchToProps, mergeProps ),
)( RecurringToDateTimePicker );
