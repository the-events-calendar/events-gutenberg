/**
 * External dependencies
 */
import { connect } from 'react-redux';
import { compose } from 'redux';

/**
 * Internal dependencies
 */
import Template from './template';
import { withSaveData, withStore } from '@moderntribe/common/src/modules/hoc';
import { actions } from '@moderntribe/tickets/data/blocks/ticket';

const mapDispatchToProps = ( dispatch ) => ( {
	setInitialState: ( props ) => {
		dispatch( actions.setTicketsInitialState( props ) );
	},
} );

export default compose(
	withStore(),
	connect( null, mapDispatchToProps ),
	withSaveData(),
)( Template );
