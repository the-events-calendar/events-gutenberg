/**
 * External dependencies
 */
import { connect } from 'react-redux';
import { compose } from 'redux';

/**
 * Internal dependencies
 */
import FromTimeRangePicker from './template';
import { constants } from '@moderntribe/events-pro/data/blocks';
import {
	actions as recurringActions,
	selectors as recurringSelectors,
} from '@moderntribe/events-pro/data/blocks/recurring';
import {
	actions as exceptionActions,
	selectors as exceptionSelectors,
} from '@moderntribe/events-pro/data/blocks/exception';
import { withStore } from '@moderntribe/common/hoc';
import { time as timeUtil } from '@moderntribe/common/utils';

const { TIME_FORMAT_HH_MM, toSeconds } = timeUtil;
const { KEY_END_TIME, KEY_MULTI_DAY, KEY_START_TIME } = constants;

const onEndTimeChange = ( stateProps, dispatchProps, ownProps ) => ( e ) => {
	const seconds = toSeconds( e.target.value, TIME_FORMAT_HH_MM );
	const min = toSeconds( stateProps.startTime, TIME_FORMAT_HH_MM );

	if (
		stateProps.isMultiDay ||
		( ! stateProps.isMultiDay && seconds > min )
	) {
		dispatchProps.editRule(
			ownProps.index,
			{ [ KEY_END_TIME ]: e.target.value },
		);
	}
};

const onStartTimeChange = ( stateProps, dispatchProps, ownProps ) => ( e ) => {
	const seconds = toSeconds( e.target.value, TIME_FORMAT_HH_MM );
	const max = toSeconds( stateProps.endTime, TIME_FORMAT_HH_MM );

	if (
		stateProps.isMultiDay ||
		( ! stateProps.isMultiDay && seconds < max )
	) {
		dispatchProps.editRule(
			ownProps.index,
			{ [ KEY_START_TIME ]: e.target.value },
		);
	}
};

const onMultiDayChange = ( dispatchProps, ownProps ) => ( e ) => {
	dispatchProps.editRule(
		ownProps.index,
		{ [ KEY_MULTI_DAY ]: !! e.target.value },
	);
};

const onEndTimeClick = ( dispatchProps, ownProps ) => ( value, onClose ) => {
	dispatchProps.editRule(
		ownProps.index,
		{ [ KEY_END_TIME ]: value },
	);
	onClose();
};

const onStartTimeClick = ( dispatchProps, ownProps ) => ( value, onClose ) => {
	dispatchProps.editRule(
		ownProps.index,
		{ [ KEY_START_TIME ]: value },
	);
	onClose();
};

const mapStateToProps = ( state, ownProps ) => {
	const selectors = ownProps.blockType === constants.RECURRING
		? recurringSelectors
		: exceptionSelectors;
	return {
		endTime: selectors.getEndTime( state, ownProps ),
		isMultiDay: selectors.getMultiDay( state, ownProps ),
		startTime: selectors.getStartTime( state, ownProps ),
	};
};

const mapDispatchToProps = ( dispatch, ownProps ) => {
	const action = ownProps.blockType === constants.RECURRING
		? recurringActions
		: exceptionActions;

	return {
		editRule: ( index, payload ) => dispatch( action.editRule( index, payload ) ),
	};
};

const mergeProps = ( stateProps, dispatchProps, ownProps ) => ( {
	...ownProps,
	...dispatchProps,
	...stateProps,
	onEndTimeChange: onEndTimeChange( stateProps, dispatchProps, ownProps ),
	onStartTimeChange: onStartTimeChange( stateProps, dispatchProps, ownProps ),
	onMultiDayChange: onMultiDayChange( dispatchProps, ownProps ),
	onEndTimeClick: onEndTimeClick( dispatchProps, ownProps ),
	onStartTimeClick: onStartTimeClick( dispatchProps, ownProps ),
} );

export default compose(
	withStore(),
	connect( mapStateToProps, mapDispatchToProps, mergeProps ),
)( FromTimeRangePicker );
