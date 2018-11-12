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
	total: selectors.getTicketsIndependentAndSharedCapacity( state ),
	available: selectors.getTicketsIndependentAndSharedAvailable( state ),
} );

export default compose(
	withStore(),
	connect( mapStateToProps ),
)( Template );

