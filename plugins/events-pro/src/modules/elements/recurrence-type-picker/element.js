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
import {
	actions as recurringActions,
	selectors as recurringSelectors,
} from '@moderntribe/events-pro/data/blocks/recurring';
import {
	actions as exceptionActions,
	selectors as exceptionSelectors,
} from '@moderntribe/events-pro/data/blocks/exception';
import { withStore } from '@moderntribe/common/hoc';

const getRecurrenceType = ( state, ownProps ) => (
	ownProps.blockType === constants.RECURRING
		? recurringSelectors.getType( state, ownProps )
		: exceptionSelectors.getType( state, ownProps )
);

const mapStateToProps = ( state, ownProps ) => ( {
	recurrenceType: getRecurrenceType( state, ownProps ),
} );

const mapDispatchToProps = ( dispatch, ownProps ) => {
	const edit = ownProps.blockType === constants.RECURRING
		? recurringActions.editRule
		: exceptionActions.editException;

	return {
		onRecurrenceTypeChange: ( selectedOption ) => (
			dispatch( edit( ownProps.index, { type: selectedOption.value } ) )
		),
	};
};

export default compose(
	withStore(),
	connect( mapStateToProps, mapDispatchToProps ),
)( RecurrenceTypePicker );
