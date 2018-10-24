/**
 * External dependencies
 */
import { connect } from 'react-redux';
import { compose } from 'redux';

/**
 * Internal dependencies
 */
import OnDatePicker from './template';
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
import { moment as momentUtil } from '@moderntribe/common/utils';
import { withStore } from '@moderntribe/common/hoc';

const {
	RECURRING,
	KEY_START_DATE,
	KEY_START_DATE_INPUT,
	KEY_START_DATE_OBJ,
} = constants;

const {
	toMoment,
	toDate,
	toDatabaseDate,
} = momentUtil;

const mapStateToProps = ( state, ownProps ) => {
	const selectors = ownProps.blockType === RECURRING
		? recurringSelectors
		: exceptionSelectors;

	return {
		date: selectors.getStartDateInput( state, ownProps ),
		start: dateTimeSelectors.getStart( state ),
	};
};

const mapDispatchToProps = ( dispatch, ownProps ) => {
	const edit = ownProps.blockType === RECURRING
		? recurringActions.editRule
		: exceptionActions.editException;

	return {
		edit: ( index, payload ) => dispatch( edit( index, payload ) ),
	};
}

const mergeProps = ( stateProps, dispatchProps, ownProps ) => {
	const { start, ...restStateProps } = stateProps;

	return {
		...ownProps,
		...restStateProps,
		onDateChange: ( date, modifiers, dayPickerInput ) => {
			let startDate, startDateInput;

			if ( date ) {
				const startDateMoment = toMoment( date );
				startDate = toDatabaseDate( startDateMoment );
				startDateInput = toDate( startDateMoment );
			} else {
				// set default start date as date time start date
				startDate = toDatabaseDate( toMoment( start ) );
				startDateInput = dayPickerInput.state.value;
			}

			dispatchProps.edit( ownProps.index, { [ KEY_START_DATE_INPUT ]: startDateInput } );
			dispatchProps.edit( ownProps.index, { [ KEY_START_DATE_OBJ ]: date } );
			dispatchProps.edit( ownProps.index, { [ KEY_START_DATE ]: startDate } );
		},
	};
};

export default compose(
	withStore(),
	connect( mapStateToProps, mapDispatchToProps, mergeProps ),
)( OnDatePicker );
