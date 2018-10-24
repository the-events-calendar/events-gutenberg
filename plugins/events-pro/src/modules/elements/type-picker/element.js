/**
 * External dependencies
 */
import { connect } from 'react-redux';
import { compose } from 'redux';

/**
 * Internal dependencies
 */
import TypePicker from './template';
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

const { RECURRING, KEY_TYPE } = constants;

const getSelected = ( state, ownProps ) => {
	const selectors = ownProps.blockType === RECURRING
		? recurringSelectors
		: exceptionSelectors;
	return selectors.getTypeOption( state, ownProps );
};

const mapStateToProps = ( state, ownProps ) => ( {
	selected: getSelected( state, ownProps ),
} );

const mapDispatchToProps = ( dispatch, ownProps ) => {
	const edit = ownProps.blockType === RECURRING
		? recurringActions.editRule
		: exceptionActions.editException;

	return {
		onChange: ( selectedOption ) => (
			dispatch( edit(
				ownProps.index,
				{ [ KEY_TYPE ]: selectedOption.value },
			) )
		),
	};
};

export default compose(
	withStore(),
	connect( mapStateToProps, mapDispatchToProps ),
)( TypePicker );
