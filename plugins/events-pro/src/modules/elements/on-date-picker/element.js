/**
 * External dependencies
 */
import { connect } from 'react-redux';
import { compose } from 'redux';
import moment from 'moment/moment';

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
	date as dateUtil,
	moment as momentUtil,
} from '@moderntribe/common/utils';
import { withStore } from '@moderntribe/common/hoc';

const {
	RECURRING,
	KEY_START_DATE,
} = constants;

const mapStateToProps = ( state, ownProps ) => {
	const selectors = ownProps.blockType === RECURRING
		? recurringSelectors
		: exceptionSelectors;

	return {
		date: selectors.getStartDate( state, ownProps );
	};
};

const mapDispatchToProps = ( dispatch, ownProps ) => {
	const edit = ownProps.blockType === RECURRING
		? recurringActions.editRule
		: exceptionActions.editException;

	return {
		onDateChange: ( date ) => {
			const startDate = date
				? momentUtil.toDate( moment( date ), dateUtil.FORMATS.DATABASE.datetime )
				: '';
			dispatch( edit( ownProps.index, { [ KEY_START_DATE ]: startDate } ) );
		},
	};
};

export default compose(
	withStore(),
	connect( mapStateToProps, mapDispatchToProps ),
)( OnDatePicker );
