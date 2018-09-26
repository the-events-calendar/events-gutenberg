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

const mapStateToProps = ( state, ownProps ) => ( {
	fromDate: selectors.getTicketStartDate( state, ownProps ),
	fromTime: selectors.getTicketStartTime( state, ownProps ),
	isSameDay: false,
	toDate: selectors.getTicketEndDate( state, ownProps ),
	toTime: selectors.getTicketEndTime( state, ownProps ),
} );

const mapDispatchToProps = ( dispatch, ownProps ) => ( {
	onFromDateChange: ( date ) => {
		const { blockId } = ownProps;
		dispatch( actions.setStartDate( blockId, momentUtil.toDate( moment( date ) ) ) );
	},
	onFromTimePickerChange: ( value ) => {
		const { blockId } = ownProps;
		dispatch( actions.setStartTime( blockId, value ) );
	},
	onFromTimePickerClick: ( value, onClose ) => {
		const { blockId } = ownProps;
		const endTime = timeUtil.fromSeconds( value, timeUtil.TIME_FORMAT_HH_MM );
		dispatch( actions.setStartTime( blockId, endTime ) );
		onClose();
	},
	onToDateChange: ( date ) => {
		const { blockId } = ownProps;
		dispatch( actions.setEndDate( blockId, momentUtil.toDate( moment( date ) ) ) );
	},
	onToTimePickerChange: ( value ) => {
		const { blockId } = ownProps;
		dispatch( actions.setEndTime( blockId, value ) );
	},
	onToTimePickerClick: ( value, onClose ) => {
		const { blockId } = ownProps;
		const endTime = timeUtil.fromSeconds( value, timeUtil.TIME_FORMAT_HH_MM );
		dispatch( actions.setEndTime( blockId, endTime ) );
		onClose();
	},
} );

export default compose(
	withStore(),
	connect(
		mapStateToProps,
		mapDispatchToProps,
	),
)( Template );
