/**
 * External dependencies
 */
import { connect } from 'react-redux';
import { compose } from 'redux';

/**
 * Internal dependencies
 */
import FromTimeRangePicker from './template';
import { actions, selectors } from '@moderntribe/events-pro/data/blocks/recurring';
import { withStore } from '@moderntribe/common/hoc';
import { time as timeUtil } from '@moderntribe/common/util';

const {
	HALF_HOUR_IN_SECONDS,
	HOUR_IN_SECONDS,
	DAY_IN_SECONDS,
	TIME_FORMAT_HH_MM,
	toSeconds,
	fromSeconds,
} = timeUtil;

const onEndTimeChange = ( stateProps, dispatchProps, ownProps ) => ( e ) => {
	const { startTime, isMultiDay } = stateProps;

	if ( isMultiDay ) {
		const min = toSeconds( startTime, TIME_FORMAT_HH_MM );

		if ( toSeconds( e.target.value, TIME_FORMAT_HH_MM ) <= min ) {
			return;
		}
	}

	dispatchProps.editRule( ownProps.index, { end_time: `${ e.target.value }:00` } );
};

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

const onMultiDayChange = ( stateProps, dispatchProps, ownProps ) => ( e ) => {
	const { startTime, endTime } = stateProps;
	const payload = {};

	if ( e.target.value ) {
		// If multi-day is checked, set multi-day to true
		payload.multi_day = true;
	} else {
		payload.multi_day = false;

		// If multi-day is unchecked, set multi-day to false and fix time if necessary
		let startTimeSeconds = toSeconds( startTime, TIME_FORMAT_HH_MM );
		let endTimeSeconds = toSeconds( endTime, TIME_FORMAT_HH_MM );

		// If end time is earlier than start time, fix time
		if ( endTimeSeconds <= startTimeSeconds ) {
			// If there is less than half an hour left in the day, roll back one hour
			if ( startTimeSeconds + HALF_HOUR_IN_SECONDS >= DAY_IN_SECONDS ) {
				startTimeSeconds -= HOUR_IN_SECONDS;
			}

			endTimeSeconds = startTimeSeconds + HALF_HOUR_IN_SECONDS;

			payload.start_time = `${ fromSeconds( startTimeSeconds, TIME_FORMAT_HH_MM ) }:00`;
			payload.end_time = `${ fromSeconds( endTimeSeconds, TIME_FORMAT_HH_MM ) }:00`;
		}
	}

	dispatchProps.editRule( ownProps.index, payload );
};

const onStartTimeChange = ( stateProps, dispatchProps, ownProps ) => ( e ) => {
	const { endTime, isMultiDay } = stateProps;

	if ( isMultiDay ) {
		const max = toSeconds( endTime, TIME_FORMAT_HH_MM );

		if ( toSeconds( e.target.value, TIME_FORMAT_HH_MM ) >= max ) {
			return;
		}
	}

	dispatchProps.editRule( ownProps.index, { start_time: `${ e.target.value}:00` } );
};

const onStartTimeClick = ( dispatchProps, ownProps ) => ( value, onClose ) => {
	const isAllDay = value === 'all-day';
	const payload = {};

	if ( isAllDay ) {
		payload.all_day = true;
		payload.start_time = '00:00:00';
		payload.end_time = '23:59:00';
	} else {
		payload.all_day = false;
		payload.start_time = fromSeconds( value, TIME_FORMAT_HH_MM );
	}

	dispatchProps.editRule( ownProps.index, payload );
	onClose();
};

const mapStateToProps = ( state, ownProps ) => ( {
	endTime: selectors.getEndTime( state, ownProps ).slice( 0, -3 ),
	isMultiDay: selectors.getMultiDay( state, ownProps ),
	startTime: selectors.getStartTime( state, ownProps ).slice( 0, -3 ),
} );

const mapDispatchToProps = ( dispatch ) => ( {
	editRule: ( index, payload ) => dispatch( actions.editRule( index, payload ) ),
} );

const mergeProps = ( stateProps, dispatchProps, ownProps ) => ( {
	...ownProps,
	...stateProps,
	onEndTimeChange: onEndTimeChange( stateProps, dispatchProps, ownProps ),
	onEndTimeClick: onEndTimeClick( dispatchProps, ownProps ),
	onMultiDayChange: onMultiDayChange(),
	onStartTimeChange: onStartTimeChange( stateProps, dispatchProps, ownProps ),
	onStartTimeClick: onStartTimeClick( dispatchProps, ownProps ),
} );

export default compose(
	withStore(),
	connect( mapStateToProps, mapDispatchToProps, mergeProps ),
)( FromTimeRangePicker );
