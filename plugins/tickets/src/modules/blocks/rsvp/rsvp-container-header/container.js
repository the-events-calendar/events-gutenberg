/**
 * External dependencies
 */
import { connect } from 'react-redux';
import { compose } from 'redux';

/**
 * Internal dependencies
 */
import RSVPContainerHeader from './template';
import { selectors } from '@moderntribe/tickets/data/blocks/rsvp';
import { withStore } from '@moderntribe/common/hoc';

const mapStateToProps = ( state ) => ( {
	title: selectors.getRSVPTitle( state ),
	description: selectors.getRSVPDescription( state ),
	capacity: selectors.getRSVPCapacity( state ),
} );

export default compose(
	withStore(),
	connect( mapStateToProps ),
)( RSVPContainerHeader );
