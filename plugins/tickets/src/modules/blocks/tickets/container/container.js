/**
 * External dependencies
 */
import { connect } from 'react-redux';
import { compose } from 'redux';

/**
 * Internal dependencies
 */
import Template from './template';
import { withStore } from '@moderntribe/common/src/modules/hoc';
import { selectors } from '@moderntribe/tickets/data/blocks/ticket';

const mapStateToProps = ( state ) => ( {
	hasTickets: selectors.hasTickets( state ),
	hasProviders: selectors.hasTicketProviders(),
} );

export default compose(
	withStore(),
	connect( mapStateToProps ),
)( Template );

