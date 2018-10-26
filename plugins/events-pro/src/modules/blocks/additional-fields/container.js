/**
 * External dependencies
 */
import { connect } from 'react-redux';
import { compose } from 'redux';

/**
 * Internal dependencies
 */
import { withSelected, withStore, withSaveData } from '@moderntribe/common/hoc';
import { actions, selectors } from '@moderntribe/events-pro/data/blocks/additional-fields';

const mapStateToProps = ( state, ownProps ) => ( {
	isPristine: selectors.getFieldIsPristine( state, ownProps ),
	value: selectors.getFieldValue( state, ownProps ),
	list: selectors.getFieldCheckboxValue( state, ownProps ),
	type: selectors.getFieldType( state, ownProps ),
	label: selectors.getFieldLabel( state, ownProps ),
	output: selectors.getFieldOutput( state, ownProps ),
	metaKey: selectors.getFieldMetaKey( state, ownProps ),
} );

const mapDispatchToProps = ( dispatch, ownProps ) => ( {
	setInitialState( props ) {
		dispatch( actions.setInitialState( props ) );
	},
	onBlockBlur() {
		const { name } = ownProps;
		dispatch( actions.setFieldBlur( name ) );
	},
} );

export default compose(
	withStore(),
	connect( mapStateToProps, mapDispatchToProps ),
	withSaveData(),
	withSelected(),
);
