/**
 * External dependencies
 */
import { connect } from 'react-redux';
import { compose } from 'redux';
import moment from 'moment';

/**
 * Internal dependencies
 */
import Template from './template';
import { withStore } from '@moderntribe/common/src/modules/hoc';
import { selectors, actions } from '@moderntribe/tickets/data/blocks/ticket';
import {
	moment as momentUtil,
	time as timeUtil,
} from '@moderntribe/common/utils';

const onFromDateChange = ( dispatch, ownProps ) => ( date, modifiers, dayPickerInput ) => {
	const { blockId } = ownProps;
	dispatch( actions.setTicketStartDate( blockId, dayPickerInput.state.value ) );
	dispatch( actions.setTicketStartDateMoment( blockId, moment( date ) ) );
	dispatch( actions.setTicketHasChanges( blockId, true ) );
};

const onFromTimePickerChange = ( dispatch, ownProps ) => ( e ) => {
	const { blockId } = ownProps;
	const startTime = e.target.value;
	if ( startTime ) {
		dispatch( actions.setTicketStartTime( blockId, startTime ) );
		dispatch( actions.setTicketHasChanges( blockId, true ) );
	}
};

const onFromTimePickerClick = ( dispatch, ownProps ) => ( value, onClose ) => {
	const { blockId } = ownProps;
	const startTime = timeUtil.fromSeconds( value, timeUtil.TIME_FORMAT_HH_MM );
	dispatch( actions.setTicketStartTime( blockId, startTime ) );
	dispatch( actions.setTicketHasChanges( blockId, true ) );
	onClose();
};

const onToDateChange = ( dispatch, ownProps ) => ( date, modifiers, dayPickerInput ) => {
	const { blockId } = ownProps;
	dispatch( actions.setTicketEndDate( blockId, dayPickerInput.state.value ) );
	dispatch( actions.setTicketEndDateMoment( blockId, moment( date ) ) );
	dispatch( actions.setTicketHasChanges( blockId, true ) );
};

const onToTimePickerChange = ( dispatch, ownProps ) => ( e ) => {
	const { blockId } = ownProps;
	const endTime = e.target.value;
	if ( endTime ) {
		dispatch( actions.setTicketEndTime( blockId, endTime ) );
		dispatch( actions.setTicketHasChanges( blockId, true ) );
	}
};

const onToTimePickerClick = ( dispatch, ownProps ) => ( value, onClose ) => {
	const { blockId } = ownProps;
	const endTime = timeUtil.fromSeconds( value, timeUtil.TIME_FORMAT_HH_MM );
	dispatch( actions.setTicketEndTime( blockId, endTime ) );
	dispatch( actions.setTicketHasChanges( blockId, true ) );
	onClose();
};

const mapStateToProps = ( state, ownProps ) => {
	/**
	 * @todo: fix this later
	 */
	const isDisabled = false;

	return {
		fromDate: selectors.getTicketStartDate( state, ownProps ),
		fromDateDisabled: isDisabled,
		fromTime: selectors.getTicketStartTime( state, ownProps ),
		fromTimeDisabled: isDisabled,
		isSameDay: momentUtil.isSameDay(
			selectors.getTicketStartDateMoment( state, ownProps ),
			selectors.getTicketEndDateMoment( state, ownProps ),
		),
		toDate: selectors.getTicketEndDate( state, ownProps ),
		toDateDisabled: isDisabled,
		toTime: selectors.getTicketEndTime( state, ownProps ),
		toTimeDisabled: isDisabled,
	};
};

const mapDispatchToProps = ( dispatch, ownProps ) => ( {
	onFromDateChange: onFromDateChange( dispatch, ownProps ),
	onFromTimePickerChange: onFromTimePickerChange( dispatch, ownProps ),
	onFromTimePickerClick: onFromTimePickerClick( dispatch, ownProps ),
	onToDateChange: onToDateChange( dispatch, ownProps ),
	onToTimePickerChange: onToTimePickerChange( dispatch, ownProps ),
	onToTimePickerClick: onToTimePickerClick( dispatch, ownProps ),
} );

export default compose(
	withStore(),
	connect(
		mapStateToProps,
		mapDispatchToProps,
	),
)( Template );