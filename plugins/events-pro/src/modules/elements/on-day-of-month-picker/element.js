/**
 * External dependencies
 */
import { connect } from 'react-redux';
import { compose } from 'redux';
import { find, includes } from 'lodash';

/**
 * Internal dependencies
 */
import OnDayOfMonthPicker from './template';
import { constants } from '@moderntribe/events-pro/data/blocks';
import {
	actions as recurringActions,
	constants as recurringConstants,
	options as recurringOptions,
	selectors as recurringSelectors,
} from '@moderntribe/events-pro/data/blocks/recurring';
import {
	actions as exceptionActions,
	selectors as exceptionSelectors,
} from '@moderntribe/events-pro/data/blocks/exception';
import { withStore } from '@moderntribe/common/hoc';

const { KEY_DAY, KEY_WEEK } = constants;

const {
	DAYS_OF_THE_WEEK_MAPPING_TO_STATE,
	DAYS_OF_THE_WEEK_MAPPING_FROM_STATE,
	WEEKS_OF_THE_MONTH,
} = recurringConstants;

const {
	DAYS_OF_THE_WEEK_OPTIONS,
	WEEKS_OF_THE_MONTH_OPTIONS,
	DAYS_OF_THE_MONTH_OPTIONS,
} = recurringOptions;

const onDayOfMonthChange = ( ownProps, edit ) => ( selectedOption ) => {
	const { value } = selectedOption;
	const payload = {};

	if ( includes( WEEKS_OF_THE_MONTH, value ) ) {
		payload[ KEY_WEEK ] = value;
	} else {
		payload[ KEY_WEEK ] = null;
		payload[ KEY_DAY ] = value;
	}

	edit( ownProps.index, payload );
};

const onWeekDayChange = ( ownProps, edit ) => ( selectedOption ) => {
	const { value } = selectedOption;
	const mappedValue = DAYS_OF_THE_WEEK_MAPPING_TO_STATE[ value ];
	edit( ownProps.index, { [ KEY_DAY ]: mappedValue } );
};

const mapStateToProps = ( state, ownProps ) => {
	const selectors = ownProps.blockType === constants.RECURRING
		? recurringSelectors
		: exceptionSelectors;
	const stateProps = {};
	const week = selectors.getWeek( state, ownProps );
	const day = selectors.getDay( state, ownProps );

	if ( includes( WEEKS_OF_THE_MONTH, week ) ) {
		stateProps.dayOfMonth = find( WEEKS_OF_THE_MONTH_OPTIONS, { value: week } );
		stateProps.weekDay = find(
			DAYS_OF_THE_WEEK_OPTIONS,
			{ value: DAYS_OF_THE_WEEK_MAPPING_FROM_STATE[ day ] },
		);
	} else {
		stateProps.dayOfMonth = find( DAYS_OF_THE_MONTH_OPTIONS, { value: day } );
	}

	return stateProps;
};

const mapDispatchToProps = ( dispatch, ownProps ) => {
	const editAction = ownProps.blockType === constants.RECURRING
		? recurringActions.editRule
		: exceptionActions.editException;
	const edit = ( index, payload ) => dispatch( editAction( index, payload ) );

	return {
		onDayOfMonthChange: onDayOfMonthChange( ownProps, edit ),
		onWeekDayChange: onWeekDayChange( ownProps, edit ),
	};
};

export default compose(
	withStore(),
	connect( mapStateToProps, mapDispatchToProps ),
)( OnDayOfMonthPicker );
