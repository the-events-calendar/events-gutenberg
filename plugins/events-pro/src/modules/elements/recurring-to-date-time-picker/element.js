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
import { constants } from '@moderntribe/events-pro/data/blocks';
import {
	actions,
	options,
	selectors,
} from '@moderntribe/events-pro/data/blocks/recurring';
import { time as timeUtil } from '@moderntribe/common/utils';
import { withStore } from '@moderntribe/common/hoc';

const { KEY_END_TIME, KEY_MULTI_DAY_SPAN } = constants;

const { TIME_FORMAT_HH_MM, fromSeconds } = timeUtil;

const getRecurringMultiDay = ( state, ownProps ) => {
	const recurringMultiDay = selectors.getMultiDaySpan( state, ownProps );
	return find(
		options.RECURRING_MULTI_DAY_OPTIONS,
		( option ) => option.value === recurringMultiDay,
	);
};

const onEndTimeChange = ( dispatch, ownProps ) => ( e ) => (
	dispatch( actions.editRule(
		ownProps.index,
		{ [ KEY_END_TIME ]: e.target.value },
	) )
);

const onEndTimeClick = ( dispatch, ownProps ) => ( value, onClose ) => {
	const endTime = value === 'all-day' ? value : fromSeconds( value, TIME_FORMAT_HH_MM );
	dispatch( actions.editRule(
		ownProps.index,
		{ [ KEY_END_TIME ]: endTime },
	) );
	onClose();
};

const onRecurringMultiDayChange = ( dispatch, ownProps ) => ( selectedOption ) => (
	dispatch( actions.editRule(
		ownProps.index,
		{ [ KEY_MULTI_DAY_SPAN ]: selectedOption.value },
	) )
);

const mapStateToProps = ( state, ownProps ) => ( {
	endTime: selectors.getEndTimeNoSeconds( state, ownProps ),
	isAllDay: selectors.getAllDay( state, ownProps ),
	recurringMultiDay: getRecurringMultiDay( state, ownProps ),
} );

const mapDispatchToProps = ( dispatch, ownProps ) => ( {
	onEndTimeChange: onEndTimeChange( dispatch, ownProps ),
	onEndTimeClick: onEndTimeClick( dispatch, ownProps ),
	onRecurringMultiDayChange: onRecurringMultiDayChange( dispatch, ownProps ),
} );

export default compose(
	withStore(),
	connect( mapStateToProps, mapDispatchToProps ),
)( RecurringToDateTimePicker );
