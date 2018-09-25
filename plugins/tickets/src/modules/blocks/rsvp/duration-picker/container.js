/**
 * External dependencies
 */
import { connect } from 'react-redux';
import { compose } from 'redux';
import moment from 'moment/moment';

/**
 * Internal dependencies
 */
import DateTimeRangePicker from './template';
import { actions, selectors } from '@moderntribe/tickets/data/blocks/rsvp';
import { withStore } from '@moderntribe/common/hoc';
import {
	moment as momentUtil,
	time as timeUtil,
} from '@moderntribe/common/utils';

const getIsSameDay = ( state ) => {
	const startDateObj = selectors.getRSVPTempStartDateObj( state );
	const endDateObj = selectors.getRSVPTempEndDateObj( state );
	if ( ! startDateObj || ! endDateObj ) {
		return false;
	}
	return momentUtil.isSameDay( startDateObj, endDateObj );
};

const onFromDateChange = ( stateProps, dispatchProps ) => ( date, modifiers, dayPickerInput ) => {
	/* TODO: prevent onchange to type/select a date after toDate */
	const { dispatch } = dispatchProps;
	let startDate;

	if ( date ) {
		startDate = momentUtil.toDate( moment( date ) );
	} else {
		startDate = dayPickerInput.state.value;
	}

	dispatch( actions.setRSVPTempStartDate( startDate ) );
	dispatch( actions.setRSVPTempStartDateObj( date ) );
	dispatch( actions.setRSVPHasChanges( true ) );
};

const onFromTimePickerChange = ( stateProps, dispatchProps ) => ( e ) => {
	/* TODO: prevent change to a time out of range */
	const { dispatch } = dispatchProps;
	const startTime = e.target.value;
	dispatch( actions.setRSVPTempStartTime( startTime ) );
	dispatch( actions.setRSVPHasChanges( true ) );
};

const onFromTimePickerClick = ( dispatchProps ) => ( value, onClose ) => {
	const { dispatch } = dispatchProps;
	const startTime = timeUtil.fromSeconds( value, timeUtil.TIME_FORMAT_HH_MM );
	dispatch( actions.setRSVPTempStartTime( startTime ) );
	dispatch( actions.setRSVPHasChanges( true ) );
	onClose();
};

const onToDateChange = ( stateProps, dispatchProps ) => ( date, modifiers, dayPickerInput ) => {
	/* TODO: prevent onchange to type/select a date before fromDate */
	const { dispatch } = dispatchProps;
	let endDate;

	if ( date ) {
		endDate = momentUtil.toDate( moment( date ) );
	} else {
		endDate = dayPickerInput.state.value;
	}

	dispatch( actions.setRSVPTempEndDate( endDate ) );
	dispatch( actions.setRSVPTempEndDateObj( date ) );
	dispatch( actions.setRSVPHasChanges( true ) );
};

const onToTimePickerChange = ( stateProps, dispatchProps ) => ( e ) => {
	/* TODO: prevent change to a time out of range */
	const { dispatch } = dispatchProps;
	const endTime = e.target.value;
	dispatch( actions.setRSVPTempEndTime( endTime ) );
	dispatch( actions.setRSVPHasChanges( true ) );
};

const onToTimePickerClick = ( dispatchProps ) => ( value, onClose ) => {
	const { dispatch } = dispatchProps;
	const endTime = timeUtil.fromSeconds( value, timeUtil.TIME_FORMAT_HH_MM );
	dispatch( actions.setRSVPTempEndTime( endTime ) );
	dispatch( actions.setRSVPHasChanges( true ) );
	onClose();
};

const mapStateToProps = ( state ) => ( {
	fromDate: selectors.getRSVPTempStartDate( state ),
	fromDateDisabled: selectors.getRSVPSettingsOpen( state ),
	fromTime: selectors.getRSVPTempStartTime( state ),
	fromTimeDisabled: selectors.getRSVPSettingsOpen( state ),
	isSameDay: getIsSameDay( state ),
	toDate: selectors.getRSVPTempEndDate( state ),
	toDateDisabled: selectors.getRSVPSettingsOpen( state ),
	toTime: selectors.getRSVPTempEndTime( state ),
	toTimeDisabled: selectors.getRSVPSettingsOpen( state ),
} );

const mapDispatchToProps = ( dispatch ) => ( { dispatch } );

const mergeProps = ( stateProps, dispatchProps, ownProps ) => ( {
	...ownProps,
	...stateProps,
	...dispatchProps,
	onFromDateChange: onFromDateChange( stateProps, dispatchProps ),
	onFromTimePickerChange: onFromTimePickerChange( stateProps, dispatchProps ),
	onFromTimePickerClick: onFromTimePickerClick( dispatchProps ),
	onToDateChange: onToDateChange( stateProps, dispatchProps ),
	onToTimePickerChange: onToTimePickerChange( stateProps, dispatchProps ),
	onToTimePickerClick: onToTimePickerClick( dispatchProps ),
} );

export default compose(
	withStore(),
	connect( mapStateToProps, mapDispatchToProps, mergeProps ),
)( DateTimeRangePicker );
