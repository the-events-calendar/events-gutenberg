/**
 * External dependencies
 */
import { connect } from 'react-redux';
import { compose } from 'redux';

/**
 * Internal dependencies
 */
import RecurrenceTypePicker from './template';
import { constants } from '@moderntribe/events-pro/data/blocks';
import { actions, selectors } from '@moderntribe/events-pro/data/blocks/recurring';
import { withStore } from '@moderntribe/common/hoc';

const getRecurrenceType = ( state, ownProps ) => (
	selectors.getRules( state, ownProps )
	// TODO: get blockType part of this
	// ownProps.blockType === constants.RECURRING
	// 	? recurringSelectors.getType( state, ownProps )
	// 	: exceptionSelectors.getType( state, ownProps )
);

const mapStateToProps = ( state, ownProps ) => ( {
	recurrenceType: getRecurrenceType( state, ownProps ),
} );

const mapDispatchToProps = ( dispatch, ownProps ) => ( {
	onRecurrenceTypeChange: ( selectedOption ) => (
		dispatch( actions.editRule( ownProps.index, { type: selectedOption.value } ) )
	),
} );

export default compose(
	withStore(),
	connect( mapStateToProps, mapDispatchToProps ),
)( RSVPContainerContent );
