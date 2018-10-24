/**
 * External dependencies
 */
import { connect } from 'react-redux';
import { compose } from 'redux';

/**
 * Internal dependencies
 */
import SingleToDateTimePicker from './template';
import { constants } from '@moderntribe/events-pro/data/blocks';
import {
	actions as recurringActions,
	selectors as recurringSelectors,
} from '@moderntribe/events-pro/data/blocks/recurring';
import {
	actions as exceptionActions,
	selectors as exceptionSelectors,
} from '@moderntribe/events-pro/data/blocks/exception';
import {
	selectors as dateTimeSelectors
} from '@moderntribe/events/data/blocks/datetime';
import {
	moment as momentUtil,
	time as timeUtil,
} from '@moderntribe/common/utils';
import { withStore } from '@moderntribe/common/hoc';

const {
	RECURRING,
	KEY_END_DATE,
	KEY_END_DATE_INPUT,
	KEY_END_DATE_OBJ,
	KEY_END_TIME,
} = constants;

const {
	toMoment,
	toDate,
	toDatabaseDate,
} = momentUtil;

const { TIME_FORMAT_HH_MM, fromSeconds } = timeUtil;

const onEndDateChange = ( ownProps, edit, end ) => (
	( date, modifiers, dayPickerInput ) => {
		let endDate, endDateInput;

		if ( date ) {
			const endDateMoment = toMoment( date );
			endDate = toDatabaseDate( endDateMoment );
			endDateInput = toDate( endDateMoment );
		} else {
			// set default end date as date time end date
			endDate = toDatabaseDate( toMoment( end ) );
			endDateInput = dayPickerInput.state.value;
		}

		edit( ownProps.index, { [ KEY_END_DATE_INPUT ]: endDateInput } );
		edit( ownProps.index, { [ KEY_END_DATE_OBJ ]: date } );
		edit( ownProps.index, { [ KEY_END_DATE ]: endDate } );
	}
);

const onEndTimeChange = ( ownProps, edit ) => ( e ) => (
	edit( ownProps.index, { [ KEY_END_TIME ]: e.target.value } )
);

const onEndTimeClick = ( ownProps, edit ) => ( value, onClose ) => {
	edit( ownProps.index, { [ KEY_END_TIME ]: fromSeconds( value, TIME_FORMAT_HH_MM ) } );
	onClose();
};

const mapStateToProps = ( state, ownProps ) => {
	const selectors = ownProps.blockType === RECURRING
		? recurringSelectors
		: exceptionSelectors;

	return {
		end: dateTimeSelectors.getEnd( state ),
		endDate: selectors.getEndDateInput( state, ownProps ),
		endTime: selectors.getEndTimeNoSeconds( state, ownProps ),
	};
};

const mapDispatchToProps = ( dispatch, ownProps ) => {
	const editAction = ownProps.blockType === RECURRING
		? recurringActions.editRule
		: exceptionActions.editException;
	const edit = ( index, payload ) => dispatch( editAction( index, payload ) );

	return {
		edit,
		onEndTimeChange: onEndTimeChange( ownProps, edit ),
		onEndTimeClick: onEndTimeClick( ownProps, edit ),
	};
};

const mergeProps = ( stateProps, dispatchProps, ownProps ) => {
	const { end, ...restStateProps } = stateProps;
	const { edit, ...restDispatchProps } = dispatchProps;

	return {
		...ownProps,
		...restStateProps,
		...restDispatchProps,
		onEndDateChange: onEndDateChange( ownProps, edit, end ),
	};
}

export default compose(
	withStore(),
	connect( mapStateToProps, mapDispatchToProps, mergeProps ),
)( SingleToDateTimePicker );
