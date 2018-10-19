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
	selectors as recurringSelectors,
} from '@moderntribe/events-pro/data/blocks/recurring';
import {
	actions as exceptionActions,
	selectors as exceptionSelectors,
} from '@moderntribe/events-pro/data/blocks/exception';
import { withStore } from '@moderntribe/common/hoc';

const mapStateToProps = ( state, ownProps ) => {
	const selectors = ownProps.blockType = constants.RECURRING
		? recurringSelectors
		: exceptionSelectors;

	return {
		// seriesEnds,
		// seriesEndsAfterTimes,
		// seriesEndsOnDate,
		// seriesEndsOnDateFormat,
	}
};

const mapDispatchToProps = ( dispatch, ownProps ) => {
	const edit = ownProps.blockType === constants.RECURRING
		? recurringActions.editRule
		: exceptionActions.editException;

	return {
		onSeriesEndsAfterTimesChange: () => {},
		onSeriesEndsChange: () => {},
		onSeriesEndsOnDateChange: () => {},
	};
};

export default compose(
	withStore(),
	connect( mapStateToProps, mapDispatchToProps ),
)( SeriesEnds );
