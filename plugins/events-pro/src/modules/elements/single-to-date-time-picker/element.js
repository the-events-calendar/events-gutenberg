/**
 * External dependencies
 */
import { connect } from 'react-redux';
import { compose } from 'redux';
import { find } from 'lodash';
import moment from 'moment/moment';

/**
 * Internal dependencies
 */
import SingleToDateTimePicker from './template';
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

const {
	RECURRING,
	KEY_END_DATE,
	KEY_END_TIME,
	KEY_LIMIT,
	KEY_LIMIT_TYPE,
} = constants;

const {
	COUNT,
	DATE,
	LIMIT_TYPE_MAPPING_FROM_STATE,
} = recurringConstants;

const onEndDateChange = ( ownProps, edit ) => ( date ) => {
	const endDate = date
		? momentUtil.toDate( moment( date ), dateUtil.FORMATS.DATABASE.datetime )
		: '';
	edit( ownProps.index, { [ KEY_END_DATE ]: endDate } );
};

const onEndTimeChange = ( ownProps, edit ) => ( e ) => (
	edit( ownProps.index, { [ KEY_END_TIME ]: e.target.value } )
);

const onEndTimeClick = ( ownProps, edit ) => ( value, onClose ) => {
	edit( ownProps.index, { [ KEY_END_TIME ]: value } );
	onClose();
};

const mapStateToProps = ( state, ownProps ) => {
	const selectors = ownProps.blockType === RECURRING
		? recurringSelectors
		: exceptionSelectors;

	return {
		endDate: selectors.getEndDate( state, ownProps ),
		endTime: selectors.getEndTime( state, ownProps ),
	};
};

const mapDispatchToProps = ( dispatch, ownProps ) => {
	const editAction = ownProps.blockType === RECURRING
		? recurringActions.editRule
		: exceptionActions.editException;
	const edit = ( index, payload ) => dispatch( editAction( index, payload ) );

	return {
		onEndDateChange: onEndDateChange( ownProps, edit ),
		onEndTimeChange: onEndTimeChange( ownProps, edit ),
		onEndTimeClick: onEndTimeClick( ownProps, edit ),
	};
};

export default compose(
	withStore(),
	connect( mapStateToProps, mapDispatchToProps ),
)( SingleToDateTimePicker );
