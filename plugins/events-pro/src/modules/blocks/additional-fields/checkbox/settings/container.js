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
import SettingsTemplate from './template';

const mapStateToProps = ( state, ownProps ) => ( {
	label: selectors.getFieldLabel( state, { name: ownProps.id } ),
	listDividerValue: selectors.getFieldDividerList( state, { name: ownProps.id } ),
	listEnderValue: selectors.getFieldDividerEnd( state, { name: ownProps.id } ),
} );

const mapDispatchToProps = ( dispatch, ownProps ) => ( {
	listDividerOnChange: ( value ) => {
		dispatch( actions.setFieldDividerList( ownProps.id, value ) );
	},
	listEnderOnChange: ( value ) => {
		dispatch( actions.setFieldDividerEnd( ownProps.id, value ) );
	},
} );

export default compose(
	withStore(),
	connect( mapStateToProps, mapDispatchToProps ),
)( SettingsTemplate );
