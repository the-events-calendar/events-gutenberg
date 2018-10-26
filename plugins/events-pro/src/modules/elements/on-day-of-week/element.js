/**
 * External dependencies
 */
import { connect } from 'react-redux';
import { compose } from 'redux';

/**
 * Internal dependencies
 */
import OnDayOfWeek from './template';
import { constants } from '@moderntribe/events-pro/data/blocks';
import {
	actions as recurringActions,
	constants as recurringConstants,
	selectors as recurringSelectors,
} from '@moderntribe/events-pro/data/blocks/recurring';
import {
	actions as exceptionActions,
	selectors as exceptionSelectors,
} from '@moderntribe/events-pro/data/blocks/exception';
import { withStore } from '@moderntribe/common/hoc';

const {
	DAYS_OF_THE_WEEK_PROP_KEYS,
	DAYS_OF_THE_WEEK_MAPPING_TO_STATE,
	DAYS_OF_THE_WEEK_PROP_KEY_MAPPING_FROM_STATE,
} = recurringConstants;

const mapStateToProps = ( state, ownProps ) => {
	const selectors = ownProps.blockType === constants.RECURRING
		? recurringSelectors
		: exceptionSelectors;
	const days = selectors.getDays( state, ownProps );
	const stateProps = { days };

	// set default checked values of each weekday to false
	DAYS_OF_THE_WEEK_PROP_KEYS.forEach( ( key ) => {
		stateProps[ key ] = false;
	} );

	// set checked value to true if weekday exists in state
	days.forEach( ( day ) => {
		const propKey = DAYS_OF_THE_WEEK_PROP_KEY_MAPPING_FROM_STATE[ day ];
		stateProps[ propKey ] = true;
	} );

	return stateProps;
};

const mapDispatchToProps = ( dispatch, ownProps ) => {
	const edit = ownProps.blockType === constants.RECURRING
		? recurringActions.editRule
		: exceptionActions.editException;

	return {
		edit: ( index, payload ) => dispatch( edit( index, payload ) ),
	};
};

const mergeProps = ( stateProps, dispatchProps, ownProps ) => {
	const { days, ...restStateProps } = stateProps;
	const { edit } = dispatchProps;

	return {
		...ownProps,
		...restStateProps,
		onDayChange: ( e ) => {
			const { checked, value } = e.target;
			const mappedValue = DAYS_OF_THE_WEEK_MAPPING_TO_STATE[ value ];
			const newDays = checked
				? [ ...days, mappedValue ].sort( ( a, b ) => a - b )
				: days.filter( ( day ) => day !== mappedValue );

			edit( ownProps.index, { [ constants.KEY_DAYS ]: newDays } );
		},
	};
};

export default compose(
	withStore(),
	connect( mapStateToProps, mapDispatchToProps, mergeProps ),
)( OnDayOfWeek );
