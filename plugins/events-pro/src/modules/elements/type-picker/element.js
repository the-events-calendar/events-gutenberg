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

const getSelected = ( state, ownProps ) => {
	const selectors = ownProps.blockType === constants.RECURRING
		? recurringSelectors
		: exceptionSelectors;
	const rule = selectors.getRule( state, ownProps );
	return selectors.getTypeOption( rule );
};

const mapStateToProps = ( state, ownProps ) => ( {
	selected: getSelected( state, ownProps ),
} );

const mapDispatchToProps = ( dispatch, ownProps ) => {
	const edit = ownProps.blockType === constants.RECURRING
		? recurringActions.editRule
		: exceptionActions.editException;

	return {
		onChange: ( selectedOption ) => (
			dispatch( edit( ownProps.index, { type: selectedOption.value } ) )
		),
	};
};

export default compose(
	withStore(),
	connect( mapStateToProps, mapDispatchToProps ),
)( RecurrenceTypePicker );
