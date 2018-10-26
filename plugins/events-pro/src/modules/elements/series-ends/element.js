/**
 * External dependencies
 */
import { connect } from 'react-redux';
import { compose } from 'redux';

/**
 * Internal dependencies
 */
import SeriesEnds from './template';
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
import {
	selectors as dateTimeSelectors
} from '@moderntribe/events/data/blocks/datetime';
import { moment as momentUtil } from '@moderntribe/common/utils';
import { withStore } from '@moderntribe/common/hoc';

const {
	RECURRING,
	KEY_LIMIT,
	KEY_LIMIT_DATE_INPUT,
	KEY_LIMIT_DATE_OBJ,
	KEY_LIMIT_TYPE,
} = constants;

const {
	COUNT,
	DATE,
} = recurringConstants;

const {
	toMoment,
	toDate,
	toDatabaseDate,
} = momentUtil;

const onSeriesEndsAfterTimesChange = ( ownProps, edit ) => ( e ) => {
	const limit = parseInt( e.target.value, 10 );
	edit( ownProps.index, { [ KEY_LIMIT ]: limit } );
};

const onSeriesEndsChange = ( ownProps, edit ) => ( selectedOption ) => (
	edit( ownProps.index, { [ KEY_LIMIT_TYPE ]: selectedOption.value } )
);

const onSeriesEndsOnDateChange = ( ownProps, edit, end ) => (
	( date, modifiers, dayPickerInput ) => {
		// default end date is date time end date if date is undefined
		const limitDate = date ? date : end;

		edit( ownProps.index, {
			[ KEY_LIMIT_DATE_INPUT ]: dayPickerInput.input.value,
			[ KEY_LIMIT_DATE_OBJ ]: date,
			[ KEY_LIMIT ]: toDatabaseDate( toMoment( limitDate ) ),
		} );
	}
);

const mapStateToProps = ( state, ownProps ) => {
	const selectors = ownProps.blockType === RECURRING
		? recurringSelectors
		: exceptionSelectors;
	const limitType = selectors.getLimitType( state, ownProps );

	const stateProps = {
		end: dateTimeSelectors.getEnd( state ),
		seriesEnds: selectors.getLimitTypeOption( state, ownProps ),
	};

	if ( limitType === DATE ) {
		stateProps.seriesEndsOnDate = selectors.getLimitDateInput( state, ownProps );
	} else if ( limitType === COUNT ) {
		stateProps.seriesEndsAfterTimes = selectors.getLimit( state, ownProps );
	}

	return stateProps;
};

const mapDispatchToProps = ( dispatch, ownProps ) => {
	const editAction = ownProps.blockType === RECURRING
		? recurringActions.editRule
		: exceptionActions.editException;
	const edit = ( index, payload ) => dispatch( editAction( index, payload ) );

	return {
		edit,
		onSeriesEndsAfterTimesChange: onSeriesEndsAfterTimesChange( ownProps, edit ),
		onSeriesEndsChange: onSeriesEndsChange( ownProps, edit ),
	};
};

const mergeProps = ( stateProps, dispatchProps, ownProps ) => {
	const { end, ...restStateProps } = stateProps;
	const { edit, ...restDispatchProps } = dispatchProps;

	return {
		...ownProps,
		...restStateProps,
		...restDispatchProps,
		onSeriesEndsOnDateChange: onSeriesEndsOnDateChange( ownProps, edit, end ),
	};
};

export default compose(
	withStore(),
	connect( mapStateToProps, mapDispatchToProps, mergeProps ),
)( SeriesEnds );
