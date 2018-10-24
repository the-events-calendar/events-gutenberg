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
	date as dateUtil,
	moment as momentUtil,
} from '@moderntribe/common/utils';
import { withStore } from '@moderntribe/common/hoc';

const {
	RECURRING,
	KEY_END_DATE,
	KEY_LIMIT,
	KEY_LIMIT_TYPE,
} = constants;

const {
	COUNT,
	DATE,
} = recurringConstants;

const onSeriesEndsAfterTimesChange = ( ownProps, edit ) => ( e ) => {
	const limit = parseInt( e.target.value, 10 );
	edit( ownProps.index, { [ KEY_LIMIT ]: limit } );
};

const onSeriesEndsChange = ( ownProps, edit ) => ( selectedOption ) => (
	edit( ownProps.index, { [ KEY_LIMIT_TYPE ]: selectedOption.value } )
);

const onSeriesEndsOnDateChange = ( ownProps, edit ) => ( date ) => {
	const endDate = date
		? momentUtil.toDate( momentUtil.toMoment( date ), dateUtil.FORMATS.DATABASE.datetime )
		: '';
	edit( ownProps.index, { [ KEY_END_DATE ]: endDate } );
};

const mapStateToProps = ( state, ownProps ) => {
	const selectors = ownProps.blockType === RECURRING
		? recurringSelectors
		: exceptionSelectors;
	const limitType = selectors.getLimitType( state, ownProps );

	const stateProps = {
		seriesEnds: selectors.getLimitTypeOption( state, ownProps ),
	};

	if ( limitType === DATE ) {
		stateProps.seriesEndsOnDate = selectors.getLimit( state, ownProps );
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
		onSeriesEndsAfterTimesChange: onSeriesEndsAfterTimesChange( ownProps, edit ),
		onSeriesEndsChange: onSeriesEndsChange( ownProps, edit ),
		onSeriesEndsOnDateChange: onSeriesEndsOnDateChange( ownProps, edit ),
	};
};

export default compose(
	withStore(),
	connect( mapStateToProps, mapDispatchToProps ),
)( SeriesEnds );
