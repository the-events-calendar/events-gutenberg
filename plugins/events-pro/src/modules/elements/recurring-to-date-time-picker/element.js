/**
 * External dependencies
 */
import { connect } from 'react-redux';
import { compose } from 'redux';
import { find } from 'lodash';

/**
 * Internal dependencies
 */
import RecurringToDateTimePicker from './template';
import {
	actions,
	options,
	selectors
} from '@moderntribe/events-pro/data/blocks/recurring';
import { withStore } from '@moderntribe/common/hoc';

const getRecurringMultiDay = ( state, ownProps ) => {
	// TODO: remove this once we have recurring multi day in state
	const recurringMultiDay = 'next_day';
	// const recurringMultiDay = selectors.getRecurringMultiDay( state, ownProps );
	return find(
		options.RECURRING_MULTI_DAY_OPTIONS,
		( option ) => option.value === recurringMultiDay,
	);
};

const onEndTimeChange = ( dispatchProps, ownProps ) => ( e ) => (
	dispatchProps.editRule(
		ownProps.index,
		{ [ constants.KEY_END_TIME ]: e.target.value } )
);

const onEndTimeClick = ( dispatchProps, ownProps ) => ( value, onClose ) => {
	dispatchProps.editRule(
		ownProps.index,
		{ [ KEY_END_TIME ]: value },
	);
	onClose();
};

const onRecurringMultiDayChange = ( dispatchProps, ownProps ) => ( selectedOption ) => (
	// TODO: fix this once we have recurring multi day in state
	null
	// dispatchProps.editRule(
	// 	ownProps.index,
	// 	{ recurring_multi_day: selectedOption.value },
	// )
);

const mapStateToProps = ( state, ownProps ) => ( {
	endTime: selectors.getEndTimeNoSeconds( state, ownProps ),
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
	onRecurringMultiDayChange: onRecurringMultiDayChange( dispatchProps, ownProps ),
} );

export default compose(
	withStore(),
	connect( mapStateToProps, mapDispatchToProps, mergeProps ),
)( RecurringToDateTimePicker );
