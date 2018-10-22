/**
 * External dependencies
 */
import { connect } from 'react-redux';
import { compose } from 'redux';
import moment from 'moment/moment';

/**
 * Internal dependencies
 */
import SeriesEnds from './template';
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
import {
	date as dateUtil,
	moment as momentUtil,
} from '@moderntribe/common/utils';
import { withStore } from '@moderntribe/common/hoc';

const mapStateToProps = ( state, ownProps ) => {
	const selectors = ownProps.blockType === constants.RECURRING
		? recurringSelectors
		: exceptionSelectors;
	const limitType = selectors.getLimitType( state, ownProps );

	const stateProps = {};

	stateProps.seriesEnds = recurringOptions.SERIES_ENDS_OPTIONS.filter( ( option ) => (
		option.value === recurringConstants.LIMIT_TYPE_MAPPING_FROM_STATE[ limitType ]
	) )[ 0 ];

	if ( limitType === recurringConstants.DATE ) {
		stateProps.seriesEndsOnDate = selectors.getLimit( state, ownProps );
	} else if ( limitType === recurringConstants.COUNT ) {
		stateProps.seriesEndsAfterTimes = selectors.getLimit( state, ownProps );
	}

	return stateProps;
};

const mapDispatchToProps = ( dispatch, ownProps ) => {
	const edit = ownProps.blockType === constants.RECURRING
		? recurringActions.editRule
		: exceptionActions.editException;

	return {
		onSeriesEndsAfterTimesChange: ( e ) => {
			const limit = parseInt( e.target.value, 10 );
			dispatch( edit( ownProps.index, { limit } ) );
		},
		onSeriesEndsChange: () => {},
		onSeriesEndsOnDateChange: ( date ) => {
			const endDate = date
				? momentUtil.toDate( moment( date ), dateUtil.FORMATS.DATABASE.datetime )
				: '';
			dispatch( edit( ownProps.index, { limit: endDate } ) );
		},
	};
};

export default compose(
	withStore(),
	connect( mapStateToProps, mapDispatchToProps ),
)( SeriesEnds );
