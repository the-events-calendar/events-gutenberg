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
import { selectors, actions } from '@moderntribe/tickets/data/blocks/ticket';
import { config } from '@moderntribe/common/utils/globals';

const getProviders = () => {
	const tickets = config().tickets || {};
	return tickets.providers || [];
};

const mapStateToProps = ( state ) => ( {
	providers: getProviders(),
	selectedProvider: selectors.getSelectedProvider( state ),
} );

const mapDispatchToProps = ( dispatch ) => ( {
	onProviderChange( event ) {
		const target = event.target;
		dispatch( actions.setProvider( target.name ) );
	},
} );

export default compose(
	withStore(),
	connect(
		mapStateToProps,
		mapDispatchToProps,
	),
	withSaveData(),
)( Template );
