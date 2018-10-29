/**
 * External dependencies
 */
import { connect } from 'react-redux';
import { compose } from 'redux';

/**
 * Internal dependencies
 */
import { withStore } from '@moderntribe/common/hoc';
import { selectors, actions } from '@moderntribe/events-pro/data/blocks/additional-fields';
import DropdownTemplate from './template';

const mapStateToProps = ( state, ownProps ) => ( {
	value: selectors.getFieldDropdownValue( state, ownProps ),
	output: selectors.getFieldDropdownOutput( state, ownProps ),
	options: selectors.getFieldOptionsWithLabels( state, ownProps ),
} );

const mapDispatchToProps = ( dispatch, ownProps ) => ( {
	onInputChange( { value } ) {
		const { name } = ownProps;
		dispatch( actions.setFieldValue( name, value ) );
		dispatch( actions.setFieldChange( name ) );
	},
} );

export default compose(
	withStore(),
	connect( mapStateToProps, mapDispatchToProps ),
)( DropdownTemplate );
