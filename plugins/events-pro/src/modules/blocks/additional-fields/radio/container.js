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
import RadioTemplate from './template';

const mapStateToProps = ( state, ownProps ) => ( {
	value: selectors.getTextFieldValue( state, ownProps ),
	output: selectors.getFieldOutput( state, ownProps ),
	options: selectors.getFieldOptionsWithLabels( state, ownProps ),
} );

const mapDispatchToProps = ( dispatch, ownProps ) => ( {
	onInputChange( event ) {
		const { name } = ownProps;
		dispatch( actions.setFieldValue( name, event.target.value ) );
		dispatch( actions.setFieldChange( name ) );
	},
} );

export default compose(
	withStore(),
	connect( mapStateToProps, mapDispatchToProps ),
)( RadioTemplate );
