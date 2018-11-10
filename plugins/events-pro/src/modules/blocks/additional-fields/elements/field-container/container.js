/**
 * External dependencies
 */
import { connect } from 'react-redux';
import { compose } from 'redux';

/**
 * Internal dependencies
 */
import { withStore } from '@moderntribe/common/hoc';
import { selectors } from '@moderntribe/events-pro/data/blocks/additional-fields';
import Template from './template';

const mapStateToProps = ( state, ownProps ) => ( {
	isPristine: selectors.getFieldIsPristine( state, { name: ownProps.id } ),
	label: selectors.getFieldLabel( state, { name: ownProps.id } ),
} );

export default compose(
	withStore(),
	connect( mapStateToProps, null ),
)( Template );
