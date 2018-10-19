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
import { time as timeUtil } from '@moderntribe/common/utils';

const {
	HALF_HOUR_IN_SECONDS,
	HOUR_IN_SECONDS,
	DAY_IN_SECONDS,
	TIME_FORMAT_HH_MM,
	toSeconds,
	fromSeconds,
} = timeUtil;


const onMultiDayChange = ( stateProps, dispatchProps, ownProps ) => ( e ) => {
	dispatchProps.editRule( ownProps.index, { multi_day: !! e.target.value } );
};

const onStartTimeClick = ( stateProps, dispatchProps, ownProps ) => ( value, onClose ) => {
	dispatchProps.editRule( ownProps.index, { start_time: value } );
	onClose();
};

const onEndTimeClick = ( stateProps, dispatchProps, ownProps ) => ( value, onClose ) => {
	dispatchProps.editRule( ownProps.index, { end_time: value } );
	onClose();
};

const onEndTimeChange = ( stateProps, dispatchProps, ownProps ) => ( e ) => {
	const seconds = toSeconds( e.target.value, TIME_FORMAT_HH_MM );
	const min = toSeconds( stateProps.startTime, TIME_FORMAT_HH_MM );

	if ( seconds > min ) {
		dispatchProps.editRule( ownProps.index, { end_time: e.target.value } );
	}
};

const onStartTimeChange = ( stateProps, dispatchProps, ownProps ) => ( e ) => {
	const seconds = toSeconds( e.target.value, TIME_FORMAT_HH_MM );
	const max = toSeconds( stateProps.endTime, TIME_FORMAT_HH_MM );

	if ( ! stateProps.isMultiDay && seconds < max ) {
		dispatchProps.editRule( ownProps.index, { start_time: e.target.value } );
	}
};

const mapStateToProps = ( state, ownProps ) => ( {
	endTime: selectors.getEndTime( state, ownProps ),
	isMultiDay: selectors.getMultiDay( state, ownProps ),
	startTime: selectors.getStartTime( state, ownProps ),
} );

const mapDispatchToProps = ( dispatch ) => ( {
	editRule: ( index, payload ) => dispatch( actions.editRule( index, payload ) ),
} );

const mergeProps = ( stateProps, dispatchProps, ownProps ) => ( {
	...ownProps,
	...stateProps,
	onEndTimeChange: onEndTimeChange( stateProps, dispatchProps, ownProps ),
	onStartTimeChange: onStartTimeChange( stateProps, dispatchProps, ownProps ),
	onMultiDayChange: onMultiDayChange( stateProps, dispatchProps, ownProps ),
	onEndTimeClick: onEndTimeClick( stateProps, dispatchProps, ownProps ),
	onStartTimeClick: onStartTimeClick( stateProps, dispatchProps, ownProps ),
} );

export default compose(
	withStore(),
	connect( mapStateToProps, mapDispatchToProps, mergeProps ),
)( FromTimeRangePicker );
