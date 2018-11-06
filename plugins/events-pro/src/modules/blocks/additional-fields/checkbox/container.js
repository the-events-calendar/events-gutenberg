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
import CheckboxTemplate from './template';

const mapStateToProps = ( state, ownProps ) => ( {
	output: selectors.getFieldOutput( state, ownProps ),
	options: selectors.getFieldCheckboxOptions( state, ownProps ),
} );

const mapDispatchToProps = ( dispatch, ownProps ) => ( {
	onInputChange( event ) {
		const { name } = ownProps;
		if ( event.target.checked ) {
			dispatch( actions.appendFieldValue( name, event.target.value ) );
		} else {
			dispatch( actions.removeFieldValue( name, event.target.value ) );
		}
		dispatch( actions.setFieldChange( name ) );
	},
} );

export default compose(
	withStore(),
	connect( mapStateToProps, mapDispatchToProps ),
)( CheckboxTemplate );
