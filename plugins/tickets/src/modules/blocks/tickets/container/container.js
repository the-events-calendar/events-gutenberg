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
import { selectors } from '@moderntribe/tickets/data/blocks/ticket';

const mapStateToProps = ( state ) => ( {
	total: selectors.getTotalCapacity( state ),
	available: selectors.getTotalAvailable( state ),
	tickets: selectors.getTicketsArray( state ),
	isLoading: selectors.isParentBlockLoading( state ),
	isTicketDisabled: selectors.isTicketDisabled( state, {
		blockId: selectors.getActiveBlockId( state ),
	} ),
} );

export default compose(
	withStore(),
	connect(
		mapStateToProps,
	),
	withSaveData(),
)( Template );

