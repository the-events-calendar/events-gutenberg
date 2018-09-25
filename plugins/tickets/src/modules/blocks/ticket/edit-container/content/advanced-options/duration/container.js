/**
 * External dependencies
 */
import { connect } from 'react-redux';
import { compose } from 'redux';

/**
 * Internal dependencies
 */
import Template from './template';
import { withStore } from '@moderntribe/common/src/modules/hoc';
import { selectors, actions } from '@moderntribe/tickets/data/blocks/ticket';

const mapStateToProps = ( state, ownProps ) => ( {} );

const mapDispatchToProps = ( dispatch, ownProps ) => ( {
	onFromDateChange: ( date ) => {
		const { blockId } = ownProps;
		dispatch( actions.setStartDate( blockId, date ) );
	},
	onFromTimePickerChange: ( value ) => {
		const { blockId } = ownProps;
		dispatch( actions.setStartTime( blockId, value ) );
	},
	onFromTimePickerClick: ( value ) => {
		/**
		 * @todo convert seconds into timestamp
		 */
	},
	onToDateChange: ( date ) => {
		const { blockId } = ownProps;
		dispatch( actions.setEndTime( blockId, date ) );
	},
	onToTimePickerChange: ( value ) => {
		const { blockId } = ownProps;
		dispatch( actions.setStartTime( blockId, value ) );
	},
	onToTimePickerClick: ( value ) => {
		/**
		 * @todo convert seconds into timestamp
		 */
	},
} );

export default compose(
	withStore(),
	connect(
		mapStateToProps,
		mapDispatchToProps,
	),
)( Template );
