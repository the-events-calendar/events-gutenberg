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
	toDatabaseDate,
} = momentUtil;

const onDateChange = ( ownProps, edit, start ) => (
	( date, modifiers, dayPickerInput ) => {
		// default end date is date time end date if date is undefined
		const startDate = date ? date : start;

		edit( ownProps.index, {
			[ KEY_START_DATE_INPUT ]: dayPickerInput.input.value,
			[ KEY_START_DATE_OBJ ]: date,
			[ KEY_START_DATE ]: toDatabaseDate( toMoment( startDate ) ),
		} );
	}
);

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
	const { edit } = dispatchProps;

	return {
		...ownProps,
		...restStateProps,
		onDateChange: onDateChange( ownProps, edit, start ),
	};
};

export default compose(
	withStore(),
	connect( mapStateToProps, mapDispatchToProps, mergeProps ),
)( OnDatePicker );
