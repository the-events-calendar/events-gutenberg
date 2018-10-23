/**
 * External dependencies
 */
import { connect } from 'react-redux';
import { compose } from 'redux';

/**
 * Internal dependencies
 */
import { withStore, withSaveData } from '@moderntribe/common/hoc';
import { actions, selectors } from '@moderntribe/events-pro/data/blocks/additional-fields';

const mapStateToProps = ( state, ownProps ) => ( {
	isPristine: selectors.getFieldIsPristine( state, ownProps ),
	value: selectors.getFieldValue( state, ownProps ),
} );

const mapDispatchToProps = ( dispatch ) => ( {
	setInitialState( props ) {
		dispatch( actions.setInitialState( props ) );
	},
} );

export default compose(
	withStore(),
	connect( mapStateToProps, mapDispatchToProps ),
	withSaveData(),
);
